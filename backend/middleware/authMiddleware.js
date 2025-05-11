const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for Authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Check for Bearer token format
    if (!req.headers.authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Invalid token format. Must be Bearer token' });
    }

    token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing in Authorization header' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};