const Product = require('../models/Product');
const User = require('../models/User');

// ==========================================
// FETCH ALL PRODUCTS (With filters)
// ==========================================
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Keyword search using our text index
    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products.', error: error.message });
  }
};

// ==========================================
// FETCH PERSONALIZED FEED ("FOR YOU")
// ==========================================
exports.getPersonalizedFeed = async (req, res) => {
  try {
    // 1. Find the logged-in user via token payload
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userStyles = user.preferences.preferredStyles;

    // 2. Query products using MongoDB Aggregation to score and sort matches
    const personalizedFeed = await Product.aggregate([
      {
        $addFields: {
          // Count how many tags match between the product and the user's preferences
          matchCount: {
            $size: { $setIntersection: ["$styleTags", userStyles] }
          }
        }
      },
      // Sort so highest matches show up first, falling back to newest arrivals
      { $sort: { matchCount: -1, createdAt: -1 } }
    ]);

    res.status(200).json(personalizedFeed);
  } catch (error) {
    res.status(500).json({ message: 'Error generating custom feed.', error: error.message });
  }
};