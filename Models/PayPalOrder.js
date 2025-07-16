const mongoose = require('mongoose');

const paypalOrderSchema = new mongoose.Schema({
  orderId: String,
  intent: String,
  amount: Number,
  currencyCode: String,
  userName: String, 
  userEmail: String,
  createdAt: { type: Date, default: Date.now }, 
  
});

module.exports = mongoose.model('PayPalOrder', paypalOrderSchema);
