const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

// Protected route: We require a user token so we know who is using our AI allotments
router.post('/stylist-chat', protect, aiController.chatWithStylist);

module.exports = router;