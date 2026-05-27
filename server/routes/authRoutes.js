const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Path to your User schema file

// POST: /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User profile already existing in DB." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, aesthetic: "Minimalist" });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '24h' });
    res.status(201).json({ token, message: "User document generated inside cluster." });
  } catch (err) {
    res.status(500).json({ message: "Server registry compilation dropped." });
  }
});

// POST: /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '24h' });
    res.json({ token, message: "Session payload verified successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal Auth validation failure." });
  }
});

module.exports = router;