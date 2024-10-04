/*

const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User, Company } = require('../models'); // Import Sequelize models

const router = express.Router();

// Admin Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Create company and admin user
    const newCompany = await Company.create({ name });
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      companyId: newCompany.id
    });

    res.status(201).send('Admin signed up successfully');
  } catch (error) {
    console.error('Error signing up admin:', error);
    res.status(500).send('Error signing up admin');
  }
});

// Nurse Invite Route
router.post('/invite', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      role: 'nurse',
      companyId: req.admin.companyId, // Assuming req.admin is already authenticated
    });

    const inviteLink = `http://localhost:3000/signup/${newUser.id}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'You are invited to join Fall Detect',
      text: `Click this link to set your password: ${inviteLink}`
    });

    res.status(200).send('Invite sent successfully');
  } catch (error) {
    console.error('Error sending invite:', error);
    res.status(500).send('Error sending invite');
  }
});

module.exports = router; // Export the router

*/