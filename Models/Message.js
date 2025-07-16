const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // This references the 'User' model
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // This references the 'User' model
  },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
