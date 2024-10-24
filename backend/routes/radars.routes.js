const express = require('express');
const router = express.Router();
const radarsController = require('../controllers/radars.controller');

// Create a new Radar
router.post('/', radarsController.createRadar);

// Get all Radars
router.get('/', radarsController.getAllRadars);

// Get total number of radars
router.get('/total', radarsController.getTotalRadars);

// Get a single Radar by ID
router.get('/:id', radarsController.getRadarById);

// Update an existing Radar
router.put('/:id', radarsController.updateRadar);

// Delete a Radar by ID
router.delete('/:id', radarsController.deleteRadar);

module.exports = router;