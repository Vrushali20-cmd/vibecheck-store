const Cart  = require('../models/Cart');
const Order = require('../models/Order');

const SHIPPING_FEE        = 99;
const FREE_SHIPPING_ABOVE = 999;

// POST /api/payment/create-order
// body: { address }
exports.createOrder = async (req, res) => {
  try {
    const { address } = req.body;

    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price imageUrl');

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const items = cart.items.map((i) => ({
      product:  i.product._id,
      name:     i.product.name,
      price:    i.product.price,
      imageUrl: i.product.imageUrl || '',
      quantity: i.quantity,
      size:     i.size,
      color:    i.color,
    }));

    const subtotal    = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingFee = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
    const total       = subtotal + shippingFee;

    const order = await Order.create({
      user: req.user.id,
      items,
      address,
      subtotal,
      shippingFee,
      total,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status:        'placed',
    });

    // Clear cart after order placed
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.json({ order });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: err.message });
  }
};