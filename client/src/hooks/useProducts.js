import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = (activeTab, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build query params
        const params = new URLSearchParams();
        if (activeTab)        params.set('category', activeTab);
        if (filters.search)   params.set('search',   filters.search);
        if (filters.minPrice) params.set('minPrice',  filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice',  filters.maxPrice);
        if (filters.styleTag) params.set('styleTag',  filters.styleTag);
        if (filters.sort)     params.set('sort',      filters.sort);

        const res = await axios.get(
          `http://localhost:5000/api/products?${params.toString()}`,
          { cancelToken: source.token }
        );
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled');
        } else {
          console.error('Fetch Error:', err);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => source.cancel();
  }, [activeTab, filters.search, filters.minPrice, filters.maxPrice, filters.styleTag, filters.sort]);

  return { products, loading };
};