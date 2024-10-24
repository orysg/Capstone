// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// JWT token generation
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.UserID,
      userType: user.UserType 
    },
    JWT_SECRET,
    { expiresIn: '3h' }
  );
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Register function (anyone can register as a Carer)
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Default role is Carer for public registration
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PasswordHash: hashedPassword,
      UserType: 'Carer'  // All public registrations are Carers by default
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register };