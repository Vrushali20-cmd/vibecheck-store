const express = require('express');
const router  = express.Router();
const { getAllProducts, getPersonalizedFeed, getProductById } = require('../controllers/productController');

router.get('/',       getAllProducts);
router.get('/feed',   getPersonalizedFeed);
router.get('/:id',    getProductById);

module.exports = router;