import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = 'https://vibecheck-backend-hyhv.onrender.com/api/orders';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vibe_token')}` },
});

export const useOrders = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API, authHeader());
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    if (token) fetchOrders();
  }, [fetchOrders]);

  const fetchOrder = async (id) => {
    try {
      const { data } = await axios.get(`${API}/${id}`, authHeader());
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Could not load order');
    }
  };

  return { orders, loading, error, fetchOrders, fetchOrder };
};
