// controllers/authController.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../Models/User');


// Create a reusable transporter object using Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'bloossomdev@gmail.com',
    pass: 'wwdwpjqkefptqohq'
  }
});

// Generate a random reset token
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(201).send('Email not found');
    }

    const token = generateToken();
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();
    const resetLink = `https://theyachtbuddy.com/reset-password/${token}`;

    const mailOptions = {
      from: 'yachtbuddyhosting@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click this link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Failed to send reset email');
      } else {
        res.status(200).send('Password reset email sent');
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).send('Invalid or expired token');
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).send('Password reset successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
