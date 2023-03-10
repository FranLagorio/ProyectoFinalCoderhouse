const { Router } = require("express");

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const name = req.user.name;
      req.session.destroy((error) => {
        if (err) {
          console.log(err);
          res.send({ error: "Error al cerrar sesión" });
          return;
        }
      });
      req.logout((error) => {
        if (error) {
          res.json(error);
        }
        res.render("pages/logout", { name: name });
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    errorLogger.error({
      error: error.message,
    });
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
});

module.exports = logoutRouter;
