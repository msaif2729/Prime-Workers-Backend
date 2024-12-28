
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const emailRouter = express.Router();

dotenv.config();

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


  // Validate input
  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: email, // Sender address
    to: process.env.EMAIL, // Recipient's email
    subject: subject, // Subject line
    replyTo:email,
    html: `
    <p>You have a new message from your website contact form:</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone No:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to send email', message: error.message });
    }
    res.status(200).send({ success: 'Message sent successfully', info });
  });
});

module.exports = emailRouter;
