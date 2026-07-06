const Cart    = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price imageUrl category');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart/add
// body: { productId, quantity, size, color }
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = '', color = '' } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const existing = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size && i.color === color
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    await cart.populate('items.product', 'name price imageUrl category');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/cart/item/:itemId
// body: { quantity }
exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product', 'name price imageUrl category');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/item/:itemId
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => i._id.toString() !== req.params.itemId
    );

    await cart.save();
    await cart.populate('items.product', 'name price imageUrl category');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart/clear
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};