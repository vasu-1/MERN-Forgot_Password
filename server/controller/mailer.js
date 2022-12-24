"use strict";

require('dotenv').config()
const template_id_registration = process.env.template_id_registration;
const apikey = process.env.API_KEY;
const sgMail = require("@sendgrid/mail");

// async..await is not allowed in global scope, must use a wrapper
async function sendmailer(email, maincontent, postscript, code, subject) {
  sgMail.setApiKey(apikey);
  const msg = {
    from: "admin@askoverflow.co",
    template_id: template_id_registration,
    personalizations: [
      {
        to: { email },
        dynamic_template_data: {
          email,maincontent,postscript,code,subject
        },
      },
    ],
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = { sendmailer };
