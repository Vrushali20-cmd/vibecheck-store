const fs = require('fs');
const path = require('path');


const dataPath = path.resolve(__dirname, '..', '..', 'client', 'src', 'components', 'products', 'data.json');

exports.getAllProducts = (req, res) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const products = JSON.parse(rawData);
        const { category } = req.query;

        if (category) {
            const filtered = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
            return res.json(filtered);
        }
        res.json(products);
    } catch (err) {
        console.error('Failed to load products from:', dataPath);
        console.error(err);
        res.status(500).json({ error: err.message, attemptedPath: dataPath });
    }
};

exports.getPersonalizedFeed = (req, res) => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        res.json(JSON.parse(rawData));
    } catch (err) {
        console.error('Failed to load products from:', dataPath);
        console.error(err);
        res.status(500).json({ error: err.message, attemptedPath: dataPath });
    }
};