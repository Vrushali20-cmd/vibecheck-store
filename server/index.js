const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const dotenv   = require('dotenv');
const path     = require('path');
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const authRoutes    = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const aiRoutes      = require('./routes/aiRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const orderRoutes   = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ai',       aiRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/payment',  paymentRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vibecheck';
const PORT      = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB.');
    app.listen(PORT, () => console.log(`Backend on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB Error:', err.message));