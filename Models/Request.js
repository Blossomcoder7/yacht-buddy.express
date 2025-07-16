const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  location: { type: String, required: true },
  date: [{ startDate: Date, endDate: Date, key: String }],
  passanger: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
