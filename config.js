const paypal = require('paypal-rest-sdk');
const { MONGO_DB, JWT_SECRET } = process.env;

paypal.configure({
  mode: 'sandbox',
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
});

module.exports = {
  jwtSecret: process.env.JWT_SECRET,

  // MongoDB connection URI
  mongoURI: process.env.MONGO_DB,

  // Other configuration variables
  // ...
};

const isDevelopment = process.env.NODE_ENV === 'development';


module.exports = {
  FRONTEND_URL: isDevelopment ? "http://localhost:3000" : "https://theyachtbuddy.com",
  // FRONTEND_URL :"https://theyachtbuddy.com"
};
