const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const emailRouter = express.Router();

// Load environment variables from a .env file
dotenv.config();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Get email from environment variable
    pass: process.env.APP_PASS, // Get email password from environment variable
  },
});

// Contact Form POST Endpoint
emailRouter.post('/send-email', (req, res) => {
  const { name, phone, email, subject, message } = req.body;

//   console.log(req.body)

  // Validate input
  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: email, // Sender address
    to: process.env.EMAIL, // Recipient's email
    subject: subject, // Subject line
    text: `You have received a message from ${name} (${phone}).\n\nMessage: ${message}`, // Plain text body
  };

  console.log(mailOptions)

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to send email', message: error.message });
    }
    res.status(200).send({ success: 'Message sent successfully', info });
  });
});

module.exports = emailRouter;
