const API_BASE = 'http://localhost:5000';
const FREE_SHIPPING_ABOVE = 999;
const SHIPPING_FEE = 99;

const OrderSummary = ({ cart }) => {
  const subtotal    = cart.items?.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0) || 0;
  const shippingFee = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total       = subtotal + shippingFee;

  return (
    <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
      <h3 className="text-sm font-bold text-zinc-800 mb-4">Order Summary</h3>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {cart.items?.map((item) => {
          const imgSrc = item.product?.imageUrl?.startsWith('http')
            ? item.product.imageUrl
            : item.product?.imageUrl
              ? `${API_BASE}${item.product.imageUrl}`
              : null;
          return (
            <div key={item._id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-200 flex-shrink-0">
                {imgSrc && <img src={imgSrc} alt={item.product?.name} loading="lazy" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-700 truncate">{item.product?.name}</p>
                <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
              </div>
              <span className="text-xs font-bold text-zinc-700">₹{(item.product?.price || 0) * item.quantity}</span>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="border-t border-zinc-200 pt-3 space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Subtotal</span><span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Shipping</span>
          <span className={shippingFee === 0 ? 'text-green-500 font-semibold' : ''}>
            {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
          </span>
        </div>
        <div className="flex justify-between text-sm font-black text-zinc-800 pt-2 border-t border-zinc-200">
          <span>Total</span><span className="text-pink-600">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;