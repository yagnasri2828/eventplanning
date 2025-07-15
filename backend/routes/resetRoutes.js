const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// 📬 SendGrid email transporter setup
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Must be the literal string 'apikey'
    pass: process.env.SENDGRID_API_KEY
  }
});

// ✅ 1. Request Reset: /auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset/${token}`;

    const mailOptions = {
  from: '"Event Planner" <yagnasri2828@gmail.com>',  // ✅ This must match your verified sender
  to: email,
  subject: '🔐 Reset Your Password',
  html: `
    <h3>Password Reset</h3>
    <p>You requested to reset your password.</p>
    <p><a href="${resetLink}">Click here to reset</a></p>
    <p>This link expires in 1 hour.</p>
  `
};


    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// ✅ 2. Reset Password: /auth/reset/:token
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
