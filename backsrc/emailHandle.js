const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/.env' });
// Function to send an email with the OTP
function sendEmail(to, otp, callback) {
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Replace with your email
            pass: process.env.PASS // Replace with your email password or app-specific password
        }
    });

    // Setup email data
    const mailOptions = {
        from: `"OTP Service" <${process.env.EMAIL}>`, // sender address
        to: to, // list of receivers
        subject: 'Your OTP', // Subject line
        text: 'Here is your One-Time Password: ' + otp, // plaintext body
        html: '<b>Here is your One-Time Password:</b> ' + otp // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback(error);
        }
        console.log('Message sent: ' + info.response);
        callback(null, info.response);
    });
}
module.exports = {
    sendEmail
};