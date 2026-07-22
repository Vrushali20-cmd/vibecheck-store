import { useOrders } from '../../hooks/useOrders';
import OrderCard from './components/OrderCard';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { orders, loading } = useOrders();

  return (
    <div className="min-h-screen bg-[#FFF9FA] pt-24 pb-16 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-zinc-800">My Orders</h1>
        <Link to="/dashboard" className="text-xs text-pink-500 font-semibold hover:underline">
          ← Back to Shop
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-pink-400 animate-pulse">
          Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-sm text-zinc-400">No orders yet</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-xs text-pink-500 font-semibold underline"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
