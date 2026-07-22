import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'https://vibecheck-backend-hyhv.onrender.com/api/cart';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vibe_token')}` },
});

export const useCart = () => {
  const [cart,    setCart]    = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API, authHeader());
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    if (token) fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, size = '', color = '', quantity = 1) => {
    try {
      const { data } = await axios.post(
        `${API}/add`,
        { productId, size, color, quantity },
        authHeader()
      );
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add to cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const { data } = await axios.patch(
        `${API}/item/${itemId}`,
        { quantity },
        authHeader()
      );
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update quantity');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await axios.delete(`${API}/item/${itemId}`, authHeader());
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove item');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/clear`, authHeader());
      setCart({ items: [] });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not clear cart');
    }
  };

  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const subtotal  = cart.items?.reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.quantity, 0
  ) || 0;

  return {
    cart,
    loading,
    error,
    itemCount,
    subtotal,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
