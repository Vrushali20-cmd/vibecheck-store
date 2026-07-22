import React from 'react';
import products from './data.json';
import ProductGrid from './ProductGrid';

const ProductDashboard = () => {
  return (
    <div>
      <h1>Product Dashboard</h1>
      <ProductGrid products={products} />
    </div>
  );
};
export default ProductDashboard;
