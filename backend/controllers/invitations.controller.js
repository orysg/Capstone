// controllers/invitations.controller.js
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { Invitations, Users } = require('../models');

// Admin sends an invitation
const inviteCarer = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists in the system
    const userCheck = await Users.findOne({ where: { Email: email } });

    if (userCheck) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Generate a token using a hashed email and timestamp with bcrypt
    const timestamp = Date.now();
    const rawToken = `${email}-${timestamp}`;
    const token = await bcrypt.hash(rawToken, 10);
    const expiresAt = new Date(timestamp + 7 * 24 * 60 * 60 * 1000); // Expires in 7 days

    // Store the token and expiration time in the Invitations table
    await Invitations.create({
      Email: email,
      Token: token,
      ExpiresAt: expiresAt,
    });

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

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Invitation sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending invitation' });
  }
};

// Handle carer sign-up with token
const signupCarer = async (req, res) => {
  const { token, firstname, lastname, email, password } = req.body;

  try {
    // Check if the token exists and is valid
    const invitation = await Invitations.findOne({
      where: { Token: token, Status: 'Pending', ExpiresAt: { [Op.gt]: new Date() } }
    });

    if (!invitation) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Create a new carer in the system
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      Email: email,
      FirstName: firstname,
      LastName: lastname,
      PasswordHash: hashedPassword,
      UserType: 'Carer',
    });

    // Update invitation status to 'Accepted'
    await invitation.update({ Status: 'Accepted' });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating carer' });
  }
};

module.exports = { inviteCarer, signupCarer };