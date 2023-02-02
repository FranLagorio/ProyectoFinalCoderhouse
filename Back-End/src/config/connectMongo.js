const mongoose = require("mongoose");
const { logger } = require("../utils/loggers");
const { MONGO_USER, MONGO_PSW, DB_NAME } = require("./config");

const connectMongoDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PSW}@cluster0.zqkvn9v.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      logger.info({ message: "Connected to Mongo Atlas" });
    })
    .catch((err) => logger.error({ message: err }));
};

const disconnectMongoDB = () => {
  mongoose.connection.close();
  logger.info({ message: "Disconnected from Mongo DB" });
};

module.exports = { connectMongoDB, disconnectMongoDB };
