const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

router.get('/',               auth, getCart);
router.post('/add',           auth, addToCart);
router.patch('/item/:itemId', auth, updateQuantity);
router.delete('/item/:itemId',auth, removeFromCart);
router.delete('/clear',       auth, clearCart);

module.exports = router;