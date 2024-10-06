const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route example, requires user is logged in
router.get('/', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route!', user: req.user });
});

module.exports = router;
