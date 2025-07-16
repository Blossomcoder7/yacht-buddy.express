const User = require('../Models/User');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "qwertyuioasdfghjklzxcvbnmklkjsf" ;
const validateEmail = require("../Middlewares/emailValidation"); 
const validatePassword = require("../Middlewares/passwordValidation");

// Register a new user
exports.register = expressAsyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const { name, email, mobileNo, password } = req.body; 

    validateEmail(req, res, () => {
      validatePassword(req, res, async () => {
        let createdUser;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
          return res.status(400).json({ message: 'User already registered' });
        }

        const user = await User.create({
          name,
          email,
          password: secPassword,
          mobileNo,
        });

        createdUser = await user.save();

        if (!createdUser) {
          return res.status(401).json({
            message: 'Invalid User Data',
          });
        }

        const data = {
          user: {
            email: email,
            name: name,
            role: createdUser.role,
            id: createdUser._id,
          }
        };

        const authToken = jwt.sign(data, jwtSecret);

        return res.status(200).json({
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
          authToken: authToken,
          role: createdUser.role,
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
exports.login = expressAsyncHandler(async (req, res) => {
  console.log("aa gya");

  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (!userData) {
      return res.status(401).json({ message: 'User not registered' });
    }

    const pwdCompare = await bcrypt.compare(password, userData.password);

    if (!pwdCompare) {
      return res.status(401).json({ message: 'Login unsuccessful' });
    }

    const data = {
      user: {
        email: userData.email,
        name: userData.name,
        id: userData._id,
        role: userData.role,
      }
    };

    const authToken = jwt.sign(data, jwtSecret);

    return res.status(200).json({
      message: 'Login successful',
      authToken: authToken,
      data: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to retrieve user profile
exports.getUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
