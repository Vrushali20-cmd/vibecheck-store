import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressForm  from './components/AddressForm';
import OrderSummary from './components/OrderSummary';

const API = 'http://localhost:5000/api/payment';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('vibe_token')}` },
});

const EMPTY_ADDRESS = {
  fullName: '', phone: '', line1: '', line2: '',
  city: '', state: '', pincode: '',
};

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const isValid = () =>
    ['fullName','phone','line1','city','state','pincode']
      .every((k) => address[k]?.trim());

  const handlePlace = async () => {
    if (!isValid()) { setError('Please fill all required fields'); return; }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        `${API}/create-order`,
        { address },
        authHeader()
      );
      navigate('/order-success', { state: { orderId: data.order._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FA] pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-zinc-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left — Address */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
            <AddressForm address={address} onChange={setAddress} />
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
            <span className="text-3xl">📦</span>
            <div>
              <p className="text-sm font-bold text-zinc-800">Cash on Delivery</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Pay when your order arrives at your door</p>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-semibold px-1">{error}</p>
          )}

          <button
            onClick={handlePlace}
            disabled={loading || !cart.items?.length}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Placing Order…' : '📦 Place Order'}
          </button>
        </div>

        {/* Right — Summary */}
        <div className="lg:col-span-5">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;