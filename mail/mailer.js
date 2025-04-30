// mailer.js
const nodemailer = require('nodemailer');

// Set up transporter (e.g., using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Outlook, SendGrid, etc.
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-email-password'  // Your email password (or app password)
    }
});

// Function to send email
function sendEmail(name, email, subject, message) {
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender email
        to: 'recipient-email@example.com', // Recipient email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;
