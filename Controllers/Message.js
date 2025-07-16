// controllers/messageController.js

const Message = require("../Models/Message");
const Conversation = require("../Models/Conversation");

//Create new Conversation

const newConversation = async (req, res) => {
  try {
    const { receiver, sender} = req.body;
    // const sender = req.id;
    console.log(receiver)
    console.log(sender)

    const exist = await Conversation.find({
      members: { $all: [receiver, sender] },
    });
console.log(exist)
if (exist.length > 0) {
  res.status(200).json("conversation already exists");
  return;
}

    const newConversation = new Conversation({
      members: [sender, receiver],
    });
    await newConversation.save();
    return res.status(200).json("conversation saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//Get all Conversation
const getConversation = async (req, res) => {
  try {
    const { receiver } = req.body;
    const sender = req.id;

    let conversation = await Conversation.find({
      members: { $all: [receiver, sender] },
    });
    res.status(200).json(Conversation);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all messages for a user
const getMessages = async (req, res) => {
  try {
    const { receiver } = req.body;
    const sender = req.id;
    // Replace with your actual route parameter
    const messages = await Message.find({
      $or: [{ sender: sender }, { receiver: receiver }],
    }).populate(["sender", "receiver"]);

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { text, receiver } = req.body;
    const sender = req.id;

    const message = new Message({
      text,
      sender,
      receiver,
    });

    await message.save();
    console.log(message);
    res.status(200).json({ message: "Message created successfully" });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMessages,
  createMessage,
  getConversation,
  newConversation,
};
