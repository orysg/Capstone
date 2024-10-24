const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all falls
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Falls');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching falls:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Add a new fall
router.post('/', async (req, res) => {
  const { radarId, fallType, responseStatus = 'Pending' } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Falls (RadarID, FallType, ResponseStatus) VALUES ($1, $2, $3) RETURNING *',
      [radarId, fallType, responseStatus]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding fall:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get total number of falls
router.get('/total', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS total FROM Falls');
    res.status(200).json({ totalFalls: parseInt(result.rows[0].total) });
  } catch (err) {
    console.error('Error fetching total falls:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
