const parseArgs = require("minimist");
const dotenv = require("dotenv");

dotenv.config();

const args = parseArgs(process.argv.slice(2));
const PORT = args.PORT || process.env.PORT || 8080;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PSW = process.env.MONGO_PSW;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PSW = process.env.REDIS_PSW;

const TEST_MAIL = process.env.TEST_MAIL;
const TEST_MAIL_PASS = process.env.TEST_MAIL_PASS;
const TEST_MAIL_TO = process.env.TEST_MAIL_TO;

const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const PHONE_NUMBER = process.env.PHONE_NUMBER;
const PHONETO = process.env.PHONETO;

const FROM_WSP = process.env.FROM_WSP;
const TO_WSP = process.env.TO_WSP;

module.exports = {
  PORT,
  MONGO_USER,
  MONGO_PSW,
  REDIS_HOST,
  REDIS_PSW,
  TEST_MAIL,
  TEST_MAIL_PASS,
  TEST_MAIL_TO,
  ACCOUNT_SID,
  AUTH_TOKEN,
  PHONE_NUMBER,
  PHONETO,
  FROM_WSP,
  TO_WSP,
};
