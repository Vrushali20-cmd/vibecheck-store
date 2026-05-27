const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  brand: { 
    type: String, 
    required: true, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  
  // Core categorization
  category: { 
    type: String, 
    required: true, 
    enum: ['Clothing', 'Makeup', 'Accessories'] 
  },
  
  // Style markers that the AI and personalization query engine will match against
  styleTags: [{ 
    type: String // e.g., ['Minimalist', 'Boho Chic', 'Streetwear', 'Evening Wear', 'Ethnic']
  }],
  
  // Relative file pathway to the local image
  imageUrl: { 
    type: String, 
    required: true 
  }, 
  
  // Highly flexible variation array adapting dynamically per category
  variants: [{
    sku: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    
    // Fields populated if item is 'Clothing'
    size: { type: String }, // 'S', 'M', 'L', 'XL'
    color: { type: String },
    
    // Fields populated if item is 'Makeup'
    shadeName: { type: String }, // 'Ruby Red', 'Nude Flash'
    shadeHex: { type: String },  // Hex codes for rendering UI swatches
    
    // Fields populated if item is 'Accessories'
    material: { type: String } // '18K Gold Plated', '925 Silver', 'Vegan Leather'
  }]
}, { timestamps: true });

// -----------------------------------------------------------------
// DYNAMIC TEXT INDEX WITH WEIGHTS (UPDATED)
// -----------------------------------------------------------------
ProductSchema.index({ 
  name: 'text', 
  brand: 'text', 
  styleTags: 'text',
  description: 'text' 
}, {
  weights: {
    name: 4,
    styleTags: 3,
    brand: 2,
    description: 1
  },
  name: "TextSearchIndex"
});

module.exports = mongoose.model('Product', ProductSchema);