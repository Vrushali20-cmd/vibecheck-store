import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vibe_token')}` },
});

const OrderSuccess = () => {
  const { state }   = useLocation();
  const navigate    = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!state?.orderId) { navigate('/dashboard'); return; }
    axios.get(`http://localhost:5000/api/orders/${state.orderId}`, authHeader())
      .then(({ data }) => setOrder(data))
      .catch(() => {});
  }, [state, navigate]);

  return (
    <div className="min-h-screen bg-[#FFF9FA] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Success animation */}
        <div className="text-7xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-2xl font-bold text-zinc-800">Order Placed!</h1>
        <p className="text-sm text-zinc-500 mt-2">
          {order?.paymentMethod === 'cod'
            ? 'Your order has been placed. Pay on delivery.'
            : 'Payment successful! Your order is confirmed.'}
        </p>

        {/* Order details */}
        {order && (
          <div className="mt-6 bg-white rounded-2xl p-5 border border-zinc-100 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Order ID</span>
              <span className="font-mono font-bold text-zinc-700 text-[10px]">{order._id}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Items</span>
              <span className="font-semibold text-zinc-700">{order.items?.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Total Paid</span>
              <span className="font-black text-pink-600">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">Payment</span>
              <span className="font-semibold text-zinc-700 capitalize">{order.paymentMethod}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            to="/orders"
            className="flex-1 py-3 rounded-2xl border border-pink-300 text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors"
          >
            View Orders
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 py-3 rounded-2xl bg-pink-600 text-xs font-bold text-white hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;