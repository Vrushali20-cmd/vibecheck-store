// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
      <h3>{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      {/* Price is divided by 100 to convert cents to standard format */}
      <p><strong>${(product.price / 100).toFixed(2)}</strong></p>
    </div>
  );
};

export default ProductCard;
