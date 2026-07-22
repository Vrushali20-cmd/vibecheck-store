const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },

  // Wishlist — stores product index (since we use data.json not MongoDB)
  wishlist: [{ type: String }],

  preferences: {
    preferredStyles:  [{ type: String }],
    skinType: {
      type: String,
      enum: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive', 'Not Specified'],
      default: 'Not Specified'
    },
    skinUndertone: {
      type: String,
      enum: ['Warm', 'Cool', 'Neutral', 'Not Specified'],
      default: 'Not Specified'
    },
    apparelSizes: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);