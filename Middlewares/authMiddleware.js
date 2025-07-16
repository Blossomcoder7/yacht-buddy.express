const jwt = require('jsonwebtoken');
const User = require('../Models/User'); 

// Middleware to authenticate users
exports.userAuth = async (req, res, next) => {
  try {
    // Get the token from the request header
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
      return res.status(401).json({ success: false, error: 'Authorization token is missing' });
    }

    // Remove the "Bearer " prefix
    const token = tokenHeader.replace('Bearer ', '');

    // Verify the token
    const decoded = jwt.verify(token,  process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not authorized' });
    }

    // Attach the user object to the request
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: 'User not authorized' });
  }
};
