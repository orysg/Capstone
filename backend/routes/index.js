const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const authAttemptsRoutes = require('./auth_attempts.routes');
const fallsRoutes = require('./falls.routes');
const radarsRoutes = require('./radars.routes');
const usersRoutes = require('./users.routes');

// Mount the routes
router.use('/auth', authRoutes);
router.use('/authAttempts', authAttemptsRoutes);
router.use('/falls', fallsRoutes);
router.use('/radars', radarsRoutes);
router.use('/users', usersRoutes);

module.exports = router;