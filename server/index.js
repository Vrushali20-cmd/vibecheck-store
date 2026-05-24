const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// ROUTE IMPORTS (Duplicates Removed)

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// MIDDLEWARE

app.use(cors());
app.use(express.json()); 


// MONGO_DB CONNECTION

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 Connected to MongoDB successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    console.error(err.message);
    console.log('\n👉 Make sure your local MongoDB service is running! Run: "mongod" in a separate terminal.');
  });


// API ROUTES (Organized and Cleaned)

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes);

// HEALTH CHECK ROUTE
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', message: 'Backend engine is running smoothly.' });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`📡 Server running on port ${PORT}`);
});