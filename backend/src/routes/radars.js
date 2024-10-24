const express = require('express');
const pool = require('../db'); // Assuming you're using the same database pool
const router = express.Router();

// Endpoint for adding a new radar
router.post('/add', async (req, res) => {
    const { ip, latitude, longitude } = req.body; // Destructure the incoming request body

    // Validate input
    if (!ip || !latitude || !longitude) {
        return res.status(400).json({ error: 'IP, Latitude, and Longitude are required.' });
    }

    try {
        // Insert the new radar into the database
        const newRadarResult = await pool.query(
            'INSERT INTO Radars (IP, Latitude, Longitude) VALUES ($1, $2, $3) RETURNING *',
            [ip, latitude, longitude]
        );

        const newRadar = newRadarResult.rows[0]; // Get the inserted radar

        res.status(201).json({
            message: 'Radar added successfully',
            radar: {
                radarid: newRadar.radarid,
                ip: newRadar.ip,
                latitude: newRadar.latitude,
                longitude: newRadar.longitude
            }
        });
    } catch (err) {
        console.error('Error adding radar:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// GET endpoint for retrieving all radars
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Radars');
        res.status(200).json(result.rows); // Return all radars
    } catch (err) {
        console.error('Error retrieving radars:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Endpoint for counting total radars
router.get('/count', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM Radars');
        const totalRadars = result.rows[0].count; // Extract the count
        res.status(200).json({ totalRadars }); // Return the total count
    } catch (err) {
        console.error('Error counting radars:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

module.exports = router;
