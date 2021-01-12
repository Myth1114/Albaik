const nodemailer = require('nodemailer');
const catchAsync = require("./catchAsync");

// eslint-disable-next-line prettier/prettier
const sendEmail = async  (options) => {
  // todo 3 steps to send the emails
  console.log("sending email now");

  // todo create a transporter (email service )
  //   const transporter = nodemailer.createTransport ({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     auth: {
  //       user: process.env.EMAIL_USERNAME,
  //       pass: process.env.EMAIL_PASSWORD
  //     },
  //     secure: false
  //   });
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "58137ed62ea0f0",
      pass: "11aa38c8ec169c"
    }
  });
  // todo define the email options
  const mailOptions = {
    from: "hello@test.com",
    to: options.email,
    subject: options.subject,
    text: options.message
    //html
  };
  console.log(mailOptions);

  // todo  actually send the email
  //await transporter.sendMail(mailOptions);
  await transport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("mail error", error);
    } else {
      console.log("sent email");
    }
  });
  console.log("sent the meil");
};
module.exports = sendEmail;
