// routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Public route for login
router.post('/login', authController.login);

// Public route for registering (anyone can register as a Carer)
router.post('/register', authController.register);

module.exports = router;