const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth.middleware');

// Create a new User
router.post('/', authenticateToken, authorizeAdmin, usersController.createUser);

// Get all Users
router.get('/', authenticateToken, authorizeAdmin, usersController.getAllUsers);

// Get a single User by ID
router.get('/:id', authenticateToken, authorizeAdmin, usersController.getUserById);

// Delete a User by ID
router.delete('/:id', authenticateToken, authorizeAdmin, usersController.deleteUser);

module.exports = router;