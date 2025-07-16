// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const quoteController = require('../Controllers/quoteController');

// Forget Password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Send A Quote
router.post('/sendQuoteTOAdmin', quoteController.sendQuoteEmail);

module.exports = router;
