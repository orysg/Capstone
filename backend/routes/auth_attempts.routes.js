const express = require('express');
const router = express.Router();
const authAttemptsController = require('../controllers/auth_attempts.controller');

// Create a new AuthAttempt
router.post('/', authAttemptsController.createAuthAttempt);

// Get all AuthAttempts
router.get('/', authAttemptsController.getAllAuthAttempts);

// Get a single AuthAttempt by ID
router.get('/:id', authAttemptsController.getAuthAttemptById);

// Delete an AuthAttempt by ID
router.delete('/:id', authAttemptsController.deleteAuthAttempt);

module.exports = router;