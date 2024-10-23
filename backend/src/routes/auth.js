const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const { generateToken } = require('../middleware/authMiddleware');

const router = express.Router();  // Ensure the router is initialized

// User registration
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, password, userType = "Admin" } = req.body;
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
    console.log(`Login request received for email: ${email}`);

    // Query the database for the user
    console.log('Running query: SELECT * FROM Users WHERE Email = $1', [email]);
    const userResult = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);

    if (userResult.rows.length === 0) {
      console.log(`User with email '${email}' not found`);
      return res.status(400).json({ error: `User with email '${email}' not found` });
    }

    const user = userResult.rows[0];
    console.log('User found:', user);

    // Check if PasswordHash exists and is defined
    if (!user.passwordhash || !password) {
      console.error('Either password or password hash is missing.');
      return res.status(400).json({ error: 'Missing password or password hash.' });
    }

    // Compare the provided password with the stored password hash
    console.log('Password provided by user:', password);
    console.log('Hashed password from database:', user.passwordhash);
    const isMatch = await bcrypt.compare(password, user.passwordhash);

    // Log the result of the password comparison
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a token for the user
    const token = generateToken(user);
    console.log('Generated token:', token);

    // Send the response
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        userid: user.userid,
        email: user.email,
        usertype: user.usertype,
      },
    });
  } catch (err) {
    console.error('Error occurred during login:', err.message);
    console.error(err.stack);  // Log full stack trace for debugging
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;  // Export the router to be used in the main server file
