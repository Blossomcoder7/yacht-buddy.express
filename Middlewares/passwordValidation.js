// passwordValidationMiddleware.js
const passwordValidator = require("password-validator");

const schema = new passwordValidator();

// Define your password validation rules
schema
  .is()
  .min(8) 
  .is()
  .max(12)
  .has()
  .uppercase() 
  .has()
  .lowercase() 
  .has()
  .digits(1)
  .has()
  .not()
  .spaces(); 

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!schema.validate(password)) {
    return res.status(400).json({
      message:
        "Password must be between 8 to 12 characters, contain at least one uppercase letter, one lowercase letter, one digits, and no spaces.",
    });
  }

  next();
};

module.exports = validatePassword;
