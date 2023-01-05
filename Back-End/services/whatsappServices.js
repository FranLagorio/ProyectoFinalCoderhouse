const twilio = require("twilio");

const {
  ACCOUNT_SID,
  AUTH_TOKEN,
  FROM_WSP,
  TO_WSP,
} = require("../src/config/config");

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async (body) => {
  try {
    await client.messages
      .create({
        body,
        from: FROM_WSP,
        to: TO_WSP,
      })
      .then((message) => console.log(message.sid))
      .done();
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendWhatsapp;
