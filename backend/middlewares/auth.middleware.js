// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to verify JWT token (Authentication)
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: ' + token + authHeader });
    }

    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin (Authorization)
const authorizeAdmin = (req, res, next) => {
  if (req.user.userType !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' + req.user.userId + ' ' + req.user.userType });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };