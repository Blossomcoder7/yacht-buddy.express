const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  mobileNo: { type: Number, required: true },
  password: { type: String, required: true },
  role: {type:String, required:true, default:"user"},
  resetToken: { type: String }, 
  resetTokenExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
