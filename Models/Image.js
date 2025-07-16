// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  originalName: String,
  filename: String,
  path: String,
});

module.exports = mongoose.model('Image', imageSchema);



