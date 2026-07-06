const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const { getOrders, getOrder } = require('../controllers/orderController');

router.get('/',    auth, getOrders);
router.get('/:id', auth, getOrder);

module.exports = router;