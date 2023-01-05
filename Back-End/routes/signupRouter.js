const { Router } = require("express");
const passport = require("passport");
const { upLoad } = require("../middlewares/multerMiddleware");

const signupRouter = Router();

signupRouter.post(
  "/",
  // upLoad,
  function (req, res, next) {
    passport.authenticate("signup", function (err, user, info) {
      if (err) {
        // Devolver mensaje de error al usuario
        return res.status(400).send(err.message);
      }
      if (!user) {
        // El usuario no se ha creado correctamente, devolver mensaje de error al usuario
        return res.status(401).send(info.message);
      }
      // El usuario se ha creado correctamente, redirigir al usuario a la página de inicio de sesión
      const userToFront = { ...user._doc };
      delete userToFront.password;
      return res.send(userToFront);
    })(req, res, next);
  }
);
// signupController.postsignup

module.exports = signupRouter;
