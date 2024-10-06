const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.userid,
      email: user.email,
      userType: user.usertype,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
};

module.exports = { generateToken, authenticateToken };
