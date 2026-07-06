import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = (activeTab) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/products?category=${activeTab}`, {
          cancelToken: source.token
        });
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled');
        } else {
          console.error("Fetch Error:", err);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeTab) fetchProducts();

    return () => source.cancel();
  }, [activeTab]); 

  return { products, loading };
};