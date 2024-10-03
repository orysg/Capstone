const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

app.get('/api_data', (req, res) => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];
  res.json(data);
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

      const newUser = await pool.query(
          'INSERT INTO Users (Email, FirstName, LastName, PasswordHash, UserType) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [email, firstName, lastName, hashedPassword, userType]
      );

      res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error('Error occurred:', err);
    console.error('Error stack trace:', err.stack);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
