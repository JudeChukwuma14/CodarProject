const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSending = (option) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.Host,
            port: process.env.Port,
            auth: {
                user: process.env.Username,
                pass: process.env.Password
            }
        });

        const emailOptions = {
            from: "ebukajude14@gmail.com",
            to: option.email,
            subject: option.subject,
            text: option.message
        };

        transporter.sendMail(emailOptions, (err, info) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = { mailSending };
