const express = require('express');
const router = express.Router();
// Yahan dhyan se dekh, direct object destructuring use kar raha hoon
const { getAllProducts, getPersonalizedFeed } = require('../controllers/productController');

// Ab direct functions pass karo, koi dot notation ka jhanjhat nahi
router.get('/', getAllProducts);
router.get('/feed', getPersonalizedFeed);

module.exports = router;