const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { errorLogger, urlMethodError } = require("../src/utils/loggers");

const loginRouter = Router();

loginRouter.post(
  "/",
  // passport.authenticate("login", { failureRedirect: "login/faillogin" }),
  // (req, res) => {
  //   res.json(req.user);
  // }

  (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(401).send("Invalid login credentials.");
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            return errorLogger.error(urlMethodError(req, error));
          }
          req.session.username = user.username;
          const body = {
            _id: user._id,
            email: user.username,
          };
          const token = jwt.sign({ user: body }, "top_secret");

          const userToFront = { ...user._doc, token };
          delete userToFront.password;
          return res.send(userToFront);
        });
      } catch (error) {
        errorLogger.error(urlMethodError(req, error));
        return res.status(500).send("Server error");
      }
    })(req, res);
  }
);

module.exports = loginRouter;

// loginRouter.get("/", loginController.get);

// (req, res, next) => {
//   console.log(req.session);
//   next();
// },
//passport.authenticate("login", { failureRedirect: "login/faillogin" }),
//CON JWT

// (req, res, next) => {
//   passport.authenticate("login", (err, user, info) => {
//     try {
//       if (err || !user) {
//         // const error = new Error("new Error");
//         // return next(error);
//         return res.redirect("login/faillogin");
//       }
//       req.login(user, { session: false }, (err) => {
//         if (err) return next(err);
//         const body = { _id: user._id, email: user.username };
//         const token = jwt.sign({ user: body }, "top_secret");
//         // return res.json({ token });
//         return next();
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// },

// loginRouter.get("/faillogin", loginController.errorLogin);
