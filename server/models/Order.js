const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },   // snapshot at time of purchase
  price:    { type: Number, required: true },
  imageUrl: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  size:     { type: String, default: '' },
  color:    { type: String, default: '' },
});

const AddressSchema = new mongoose.Schema({
  fullName:   { type: String, required: true },
  phone:      { type: String, required: true },
  line1:      { type: String, required: true },
  line2:      { type: String, default: '' },
  city:       { type: String, required: true },
  state:      { type: String, required: true },
  pincode:    { type: String, required: true },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items:   [OrderItemSchema],
  address: { type: AddressSchema, required: true },

  // Pricing
  subtotal:    { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  total:       { type: Number, required: true },

  // Payment
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cod'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  razorpayOrderId:   { type: String, default: '' },
  razorpayPaymentId: { type: String, default: '' },

  // Order lifecycle
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'placed',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);