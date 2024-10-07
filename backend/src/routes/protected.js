const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route example, requires user is logged in
router.get('/tokenOnly', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route!', user: req.user });
});

router.get('/adminOnly', authenticateToken, authorizeRoles(['Admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
