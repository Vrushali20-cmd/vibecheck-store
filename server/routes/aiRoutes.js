const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

// Existing chat endpoint
router.post('/stylist-chat', protect, aiController.chatWithStylist);

// NEW: Seeder endpoint (Public or un-protected so you can run it easily in Postman)
router.post('/seed-catalog', aiController.seedCatalog);

module.exports = router;