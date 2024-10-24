const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const nodemailer = require('nodemailer');
const router = express.Router();

// Admin sends an invitation
router.post('/invite-carer', async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received invite request for:', email); // Logging

    // Check if email already exists in the system
    const userCheck = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
    console.log('User check result:', userCheck.rows); // Logging

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate a token using a hashed email and timestamp with bcrypt
    const timestamp = Date.now();
    const rawToken = `${email}-${timestamp}`;
    const token = await bcrypt.hash(rawToken, 10);
    const expiresAt = new Date(timestamp + 7 * 24 * 60 * 60 * 1000); // Expires in 7 days

    // Store the token and expiration time in the Invitations table
    const invitationResult = await pool.query(
      'INSERT INTO Invitations (Email, Token, ExpiresAt) VALUES ($1, $2, $3)',
      [email, token, expiresAt]
    );
    console.log('Invitation inserted into DB:', invitationResult); // Logging

    // Send the email invitation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'adm.frontguard@gmail.com',
      to: email,
      subject: 'You are invited to join as a Carer',
      text: `Click the following link to sign up as a carer: http://localhost:3000/signup?token=${encodeURIComponent(token)}`,
    };

    const mailResult = await transporter.sendMail(mailOptions);
    console.log('Mail sent successfully:', mailResult); // Logging

    res.status(200).json({ message: 'Invitation sent!' });
  } catch (error) {
    console.error('Error sending invitation:', error); // Log error details
    res.status(500).json({ error: 'Error sending invitation' });
  }
});


// Handle carer sign-up with token
router.post('/signup-carer', async (req, res) => {
  const { token, firstname, lastname, email, password } = req.body;

  try {
    // Check if the token exists and is valid
    const result = await pool.query('SELECT * FROM Invitations WHERE Token = $1 AND Status = $2 AND ExpiresAt > NOW()', [token, 'Pending']);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Create a new carer in the system
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
      'INSERT INTO Users (Email, FirstName, LastName, PasswordHash, UserType) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, firstname, lastname, hashedPassword, 'Carer']
    );

    // Update invitation status to accepted
    await pool.query('UPDATE Invitations SET Status = $1 WHERE Token = $2', ['Accepted', token]);

    res.status(201).json(user.rows[0]);
  } catch (error) {
    console.error('Error creating carer:', error.message || error);
    res.status(500).json({ error: 'Error creating carer' });
  }
});

module.exports = router;
