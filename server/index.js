const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// -----------------------------------------------------------------
// ROUTING LAYER: Mounting your predefined route files
// -----------------------------------------------------------------
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Make sure these base paths map directly to what Axios expects
app.use('/api/auth', authRoutes);         // Handles registration & login
app.use('/api/products', productRoutes); // Handles fetching the catalog feed
app.use('/api/ai', aiRoutes);             // Handles the Gemini chatbot traffic

// -----------------------------------------------------------------
// DATABASE CONNECTION & LISTEN
// -----------------------------------------------------------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vibecheck';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🏁 Connected to MongoDB successfully.');
    app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('🚨 MongoDB Connection Error:', err.message);
  });