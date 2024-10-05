const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 4000;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(express.json());

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


// Protected url example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route!', user: req.user });
});

app.post('/api/register', async (req, res) => {
  const { email, firstName, lastName, password, userType = "Carer" } = req.body;
  console.error("UserType:", userType, JSON.stringify(userType));
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
    console.error('Error stack trace:', err.stack);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: `User with email '${email}' not found`});
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




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
