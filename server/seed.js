const mongoose = require('mongoose');
const Product = require('./models/Product'); // Schema import
const products = require('./data.json'); // Tumhari JSON file

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/vibecheck_db');
    
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    console.log("Success: 50+ items seeded into Database!");
  } catch (err) {
    console.error("Seeding Error:", err);
  } finally {
    process.exit();
  }
};

seedDB();