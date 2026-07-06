const Order = require('../models/Order');

// GET /api/orders — full order history for logged-in user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/orders/:id — single order detail
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id:  req.params.id,
      user: req.user.id,
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};