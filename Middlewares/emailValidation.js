// emailValidationMiddleware.js
const emailValidator = require("email-validator");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!emailValidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  next();
};

module.exports = validateEmail;
