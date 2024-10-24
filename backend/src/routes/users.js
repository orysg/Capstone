const express = require('express');
const pool = require('../db');
const router = express.Router();

// Fetch all users
router.get('/', async (req, res) => {  // Removed /users prefix
  try {
    const result = await pool.query('SELECT * FROM Users');
    console.log(result.rows); 
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Fetch a single user by ID
router.get('/:id', async (req, res) => {  // Removed /users prefix
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM Users WHERE UserID = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user', err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {  // Removed /users prefix
  const { email, firstName, lastName, passwordHash, userType } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Users (Email, FirstName, LastName, PasswordHash, UserType) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, firstName, lastName, passwordHash, userType]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {  // Removed /users prefix
  const userId = req.params.id;
  const { email, firstName, lastName, userType } = req.body;
  
  console.log('Incoming request to update user:', { userId, email, firstName, lastName, userType });

  if (!email || !firstName || !lastName || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const result = await pool.query(
      'UPDATE Users SET Email = $1, FirstName = $2, LastName = $3, UserType = $4 WHERE UserID = $5 RETURNING *',
      [email, firstName, lastName, userType, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {  // Removed /users prefix
  const userId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM Users WHERE UserID = $1 RETURNING *', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
