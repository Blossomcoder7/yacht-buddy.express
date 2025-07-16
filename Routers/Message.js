// routes/messageRoutes.js
const express = require('express');
const message = require('../Controllers/Message');
const { verifyToken } = require("../Utils/jwtVerify");

const router = express.Router();
router.use(verifyToken);

    
// Get Conversation
router.get('/conversation',  message.getConversation);

// Create a new Conversation
router.post('/newConversation',  message.newConversation);

// Get messages for a user
router.get('/message/',  message.getMessages);

// Create a new message
router.post('/messages', message.createMessage);

module.exports = router;
