import { useNavigate } from 'react-router-dom';
import CartItem    from './components/CartItem';
import CartSummary from './components/CartSummary';

const Cart = ({ isOpen, onClose, cart, loading, subtotal, onUpdateQty, onRemove }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <h2 className="text-base font-bold text-zinc-800">
            Your Cart
            {cart.items?.length > 0 && (
              <span className="ml-2 text-xs font-mono bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                {cart.items.length}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {loading ? (
            <div className="py-16 text-center text-xs text-pink-400 animate-pulse">
              Loading cart…
            </div>
          ) : cart.items?.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-5xl mb-3">🛍️</div>
              <p className="text-sm text-zinc-400">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-xs text-pink-500 font-semibold underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Summary — only when items exist */}
        {cart.items?.length > 0 && (
          <div className="px-5 pb-6">
            <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;