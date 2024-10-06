const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { generateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, password, userType = "Carer" } = req.body;
  try {
    const existingUser = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserResult = await pool.query(
      'INSERT INTO Users (Email, FirstName, LastName, PasswordHash, UserType) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, firstName, lastName, hashedPassword, userType]
    );

    const newUser = newUserResult.rows[0];
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        userid: newUser.userid,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        usertype: newUser.usertype
      }
    });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: `User with email '${email}' not found` });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        userid: user.userid,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        usertype: user.usertype
      },
    });
  } catch (err) {
    console.error('Error occurred during login:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
