import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import HeroSection from './HeroSection';
import ProductCard from './ProductCard';

export default function PublicStorefront({ setAuthModalOpen }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products/feed')
      .then(res => setProducts(res.data || []))
      .catch(err => console.error("Guest feed failed:", err));
  }, []);

  return (
    <div className="bg-[#09090b] min-h-screen">
      <HeroSection onOpenChat={() => setAuthModalOpen(true)} />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-xl font-semibold text-white mb-6 border-b border-zinc-800 pb-4">
          Curated Global Collection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(item => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}