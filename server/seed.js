const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust this path if your model is elsewhere
require('dotenv').config();

const sampleProducts = [
  {
    name: "Classic Silk Wrap Dress",
    brand: "Aura Label",
    price: 3499,
    category: "Clothing",
    styleTags: ["Minimalist", "Evening Wear"],
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    description: "An elegant, flowing silk wrap dress perfect for upscale evening occasions."
  },
  {
    name: "Minimalist Chunky Hoop Earrings",
    brand: "Luxe Basics",
    price: 1250,
    category: "Accessories",
    styleTags: ["Minimalist"],
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
    description: "Clean, geometric gold hoop earrings designed for a sharp modern aesthetic."
  },
  {
    name: "Oversized Streetwear Hoodie",
    brand: "VibeCheck Co",
    price: 2199,
    category: "Clothing",
    styleTags: ["Streetwear", "Casual"],
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    description: "Heavyweight cotton oversized hoodie for everyday urban comfort."
  },
  {
    name: "Matte Liquid Lipstick Set",
    brand: "GlowUp Beauty",
    price: 1850,
    category: "Accessories", 
    styleTags: ["Glam", "Warm Undertone"],
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
    description: "Long-lasting matte finish shades perfectly curated for warm undertone profiles."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 Connected to MongoDB for seeding...");
    
    // Clear existing products to prevent duplicates
    await Product.deleteMany({});
    console.log("🧹 Cleared old products.");

    // Insert the items
    await Product.insertMany(sampleProducts);
    console.log("🌱 Database successfully seeded with 4 retail items!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();