import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'https://vibecheck-backend-hyhv.onrender.com/api/wishlist';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vibe_token')}` },
});

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading,  setLoading]  = useState(false);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API, authHeader());
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    if (token) fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    const id = String(productId);
    if (wishlist.includes(id)) {
      // Remove
      setWishlist(prev => prev.filter(i => i !== id)); // optimistic
      try {
        const { data } = await axios.delete(`${API}/remove/${id}`, authHeader());
        setWishlist(data.wishlist);
      } catch (err) {
        fetchWishlist(); // revert on error
      }
    } else {
      // Add
      setWishlist(prev => [...prev, id]); // optimistic
      try {
        const { data } = await axios.post(`${API}/add`, { productId: id }, authHeader());
        setWishlist(data.wishlist);
      } catch (err) {
        fetchWishlist(); // revert on error
      }
    }
  };

  return { wishlist, loading, toggleWishlist, fetchWishlist };
};
