const passport = require("passport");

//Login and Register Strategies
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

//Auth strategy
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Users = require("../models/userSchema");
const GoogleUsers = require("../models/googleUserSchema");

const { logger } = require("../src/utils/loggers");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../src/config/config");

const loginPassport = {
  localStrategy: new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        logger.info({ message: "User not found with username " + username });
        return done(null, false);
      }

      const validate = user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      // const userToLogin = { ...user._doc };
      // delete userToLogin.password;

      return done(null, user);
    });
  }),

  googleStrategy: new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/login/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      };

      try {
        let user = await GoogleUsers.findOne({ googleId: profile.id });
        if (user) {
          logger.info({ message: "User already exists" });
          return done(null, user);
        } else {
          user = await GoogleUsers.create(newUser, (err, user) => {
            if (err) {
              logger.error({ message: "Error in Saving user: " + err });
              return done(err);
            }
            logger.info({ message: "User Registration was successfull" });

            return done(null, user);
          });
        }
      } catch (error) {
        logger.error({ message: "Error in Saving user: " + err });
      }
    }
  ),
};

const signUpPassport = {
  localStrategy: new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      Users.findOne({ username: username }, function (error, user) {
        if (error) {
          logger.error({ message: "Error in SingnUp: " + error });
          return done(error);
        }

        if (user) {
          logger.info({ message: "User already exists" });
          return done(null, false, { message: "User already exists" });
        }

        const { name, age, address, phone } = req.body;

        const newUser = {
          username,
          password,
          name,
          age,
          address,
          phone,
          image: req.file?.filename ? req.file.filename : "",
        };

        if (!!!newUser.image) {
          delete newUser.image;
        }

        Users.create(newUser, (err, user) => {
          if (err) {
            logger.error({ message: "Error in Saving user: " + err });
            return done(err);
          }
          logger.info({ message: "User Registration was successfull" });

          return done(null, user);
        });
      });
    }
  ),
};

const passportJwt = {
  strategy: new JWTStrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return next(error);
      }
    }
  ),
};

const serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
};
const deserializeUser = () => {
  passport.deserializeUser((id, done) => {
    Users.findById(id, done);
  });
};

module.exports = {
  loginPassport,
  signUpPassport,
  serializeUser,
  deserializeUser,
  passportJwt,
};
