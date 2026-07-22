const fs   = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', '..', 'client', 'src', 'components', 'products', 'data.json');

const loadProducts = () => {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
};

exports.getAllProducts = (req, res) => {
  try {
    let products = loadProducts();
    const { category, search, minPrice, maxPrice, styleTag, sort } = req.query;

    // Filter by category
    if (category) {
      products = products.filter(p =>
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Search by name, brand, description, styleTags
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      products = products.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.styleTags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by price range
    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }

    // Filter by style tag
    if (styleTag) {
      products = products.filter(p =>
        p.styleTags?.some(t => t.toLowerCase() === styleTag.toLowerCase())
      );
    }

    // Sort
    if (sort === 'price_asc')  products.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') products.sort((a, b) => b.price - a.price);
    if (sort === 'name_asc')   products.sort((a, b) => a.name.localeCompare(b.name));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPersonalizedFeed = (req, res) => {
  try {
    res.json(loadProducts());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = (req, res) => {
  try {
    const products = loadProducts();
    const index    = parseInt(req.params.id, 10);
    if (isNaN(index) || index < 0 || index >= products.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ ...products[index], _id: index });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};