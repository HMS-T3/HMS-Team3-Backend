const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const enums = require("../constants/enum");
const msgHandler = require("../functions/msgHandler");

const CLIENT_ID_MAIL = process.env.EMAIL_CLIENTID;
const CLIENT_SECRET_MAIL = process.env.EMAIL_SECRET;
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SEND_MAIL = process.env.EMAIL;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID_MAIL,
  CLIENT_SECRET_MAIL,
  REDIRECT_URI
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

module.exports = async function sendMail(to, subject, text, name) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SEND_MAIL,
        clientId: CLIENT_ID_MAIL,
        clientSecret: CLIENT_SECRET_MAIL,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    MailTemplate = await ejs.renderFile(__dirname + "/../views/mail.ejs", {
      email: to,
    });

    const mailOptions = {
      from: enums.emailFrom,
      to: to,
      subject: subject,
      text: text,
      html: MailTemplate,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(msgHandler.pass(result));
    return result;
  } catch (error) {
    console.log(msgHandler.fail(error));
    return error;
  }
};
