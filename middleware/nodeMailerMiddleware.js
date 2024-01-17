const nodeMailer = require('nodemailer');
require('dotenv').config();
const bodyParser = require('body-parser');

async function sendEmail(req) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: process.env.NODE_MAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `"BBlog-project" ${req.body.email}`,
    to: process.env.NODE_MAILER_EMAIL,
    subject: "BBlog - contact form",
    html: req.body.content,
  });

  console.log(info.messageId);
}

module.exports = sendEmail;
