// src/components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;