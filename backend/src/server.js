const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { exec } = require('child_process'); // Import child_process for executing MATLAB scripts
const path = require('path'); // Import path for handling file paths
const app = express();
const PORT = process.env.PORT || 4000;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.userid,
      email: user.email,
      userType: user.usertype,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
}

// User registration
app.post('/api/register', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
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

// New endpoint for generating images
app.post('/api/generate-images', (req, res) => {
    const inputDirectory = req.body.inputDirectory; // Get the input directory from the request body
    const scriptPath = path.join(__dirname, 'MATLABS', 'apply_generate_pic_to_datasets.m'); // Update with the correct path

    exec(`matlab -batch "apply_generate_pic_to_datasets('${inputDirectory}')"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Error generating images' });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error generating images' });
        }
        console.log(`Script output: ${stdout}`);
        res.status(200).json({ message: 'Images generated successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
