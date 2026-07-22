const FREE_SHIPPING_ABOVE = 999;
const SHIPPING_FEE = 99;

const CartSummary = ({ subtotal, onCheckout }) => {
  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total    = subtotal + shipping;

  return (
    <div className="border-t border-zinc-100 pt-4 mt-2">
      <div className="space-y-2 text-xs text-zinc-500">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-700">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'text-green-500 font-semibold' : 'font-semibold text-zinc-700'}>
            {shipping === 0 ? 'FREE' : `₹${shipping}`}
          </span>
        </div>
        {subtotal < FREE_SHIPPING_ABOVE && (
          <p className="text-[10px] text-pink-400">
            Add ₹{FREE_SHIPPING_ABOVE - subtotal} more for free shipping
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-100">
        <span className="text-sm font-bold text-zinc-800">Total</span>
        <span className="text-base font-black text-pink-600">₹{total}</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full mt-4 py-3 rounded-2xl text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 transition-colors"
      >
        Proceed to Checkout →
      </button>
    </div>
  );
};

export default CartSummary;