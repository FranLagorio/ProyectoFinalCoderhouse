const { errorLogger } = require("../src/utils/loggers");
const { sendEmail } = require("../services/emailServices");

const signupController = {
  get: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.render("pages/signup");
      }
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      return res
        .status(500)
        .send({ status: "Get page Sign Up error", body: error });
    }
  },
  postsignup: async (req, res) => {
    try {
      console.log("first");
      // req.session.username = req.user;
      await sendEmail(req.user);
      // res.redirect("/home");
      res.status(200).send(req.user);
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      return res.status(500).send(error.message);
    }
  },

  errorSignup: (req, res, info) => {
    console.log("asdasdas");
    try {
      console.log("first");
      console.log(req);
      console.log(info);
    } catch (error) {
      console.log("error");
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({ status: "Sign Up error", body: error });
    }
  },
};

module.exports = { signupController };
