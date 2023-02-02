const express = require("express");
const cors = require("cors");

const {
  sessionsAndLoginMiddleware,
} = require("./middlewares/sessionsAndLoginMiddleware");
const { viewEngineMiddleware } = require("./middlewares/viewEngineMiddleware");

const { PORT } = require("./src/config/config");

const { connectMongoDB } = require("./src/config/connectMongo");
const Router = require("./routes/Router");
const { logger } = require("./src/utils/loggers");

const app = express();

// if (process.env.NODE_ENV == "development") {
//   app.use((req, res, next) => {
//     logger.info({ URL: req.originalUrl, method: req.method });
//     next();
//   });
// }

app.use(cors());

connectMongoDB();

app.use(express.static(__dirname + "/public"));

//Redis and Pasport Middleware
sessionsAndLoginMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Router(app);

app.listen(PORT, () => {
  console.log("Servidor Funcionando en Puerto: " + PORT);
});
app.on("error", (error) => console.log(`Error en servidor ${error}`));
