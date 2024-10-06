const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { ip, latitude, longitude } = req.body;

  if (!ip || !latitude || !longitude) {
    return res.status(400).json({ error: 'IP, Latitude, and Longitude are required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Radars (IP, Latitude, Longitude) VALUES ($1, $2, $3) RETURNING *',
      [ip, latitude, longitude]
    );

    res.status(201).json({
      message: 'Radar added successfully',
      radar: result.rows[0],
    });
  } catch (err) {
    console.error('Error adding radar:', err.message);
    res.status(500).json({ error: 'Failed to add radar' });
  }
});

module.exports = router;
