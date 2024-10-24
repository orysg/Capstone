const express = require('express');
const router = express.Router();
const fallsController = require('../controllers/falls.controller');

// Likely add authMiddleware here

// Create a new Fall
router.post('/', fallsController.createFall);

// Get all Falls
router.get('/', fallsController.getAllFalls);

// Get total number of falls
router.get('/total', fallsController.getTotalFalls);

// Get a single Fall by ID
router.get('/:id', fallsController.getFallById);

// Delete a Fall by ID
router.delete('/:id', fallsController.deleteFall);

module.exports = router;