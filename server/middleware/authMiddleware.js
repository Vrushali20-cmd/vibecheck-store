const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    // Verify token (strip out 'Bearer ' if present)
    const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    
    req.user = decoded; // Adds user id to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};