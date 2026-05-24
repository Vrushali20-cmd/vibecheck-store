const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

// Public route: Anyone can browse the catalog
router.get('/', productController.getAllProducts);

// Protected route: Requires a valid JWT token to get a personalized feed
router.get('/feed', protect, productController.getPersonalizedFeed);

module.exports = router;