const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  boatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boat',
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: String,
  },
  sendTOwner: {
    type: String,
    default: "no"
  },
  date: [{
    startDate: Date,
    endDate: Date,
    key: String
  }],
  username: {
    type: String,
    required: true,
  },
  duration: {
    type: [String],
    required: "true",
  },
  startTime: {
    type: [String],
    required: "true",
  },
  passenger: {
    type: Number,
    required: "true"
  },


  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model("Inquiry", messageSchema);
module.exports = Inquiry;
