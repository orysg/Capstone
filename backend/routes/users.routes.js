const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth.middleware');

// Create a new User
router.post('/', usersController.createUser); // authenticateToken, authorizeAdmin

// Get all Users
router.get('/', usersController.getAllUsers); // authenticateToken, authorizeAdmin,

// Get a single User by ID
router.get('/:id', usersController.getUserById); // authenticateToken, authorizeAdmin

// Delete a User by ID
router.delete('/:id', usersController.deleteUser); // authenticateToken, authorizeAdmin

module.exports = router;