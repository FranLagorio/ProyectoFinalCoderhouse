const { Router } = require("express");
const passport = require("passport");
const homeRouter = Router();

const homeController = require("../controller/homeController");
const { passportJwt } = require("../middlewares/passportMiddleware");

homeRouter.get(
  "/",
  // (req, res, next) => {
  //   console.log("aca de nuevo");
  //   console.log(req.isAuthenticated());
  //   next();
  // },
  passport.authenticate("jwt", { session: false }),
  homeController.get
);
homeRouter.get("/info", homeController.getInfo);

module.exports = homeRouter;
