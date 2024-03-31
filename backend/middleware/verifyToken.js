const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
    const user = await User.findById(req.user.id);
    if (user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'You are not authorized' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };