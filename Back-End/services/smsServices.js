const twilio = require("twilio");

const {
  ACCOUNT_SID,
  AUTH_TOKEN,
  PHONE_NUMBER,
  PHONETO,
} = require("../src/config/config");

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body) => {
  try {
    const message = await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: PHONETO,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendSMS;
