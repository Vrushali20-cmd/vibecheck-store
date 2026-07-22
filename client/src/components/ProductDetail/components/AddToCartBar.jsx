import { useState } from 'react';

const AddToCartBar = ({ product, selected, onAddToCart, onBuyNow }) => {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAddToCart(product._id, selected.size || '', selected.color || selected.shade || '', qty);
  };

  const handleBuy = () => {
    onBuyNow(product._id, selected.size || '', selected.color || selected.shade || '', qty);
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-zinc-100 px-4 py-4 flex items-center gap-3 shadow-lg">
      {/* Quantity */}
      <div className="flex items-center gap-2 border border-zinc-200 rounded-xl px-3 py-2">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="text-zinc-500 font-bold w-5 text-center"
        >−</button>
        <span className="text-sm font-bold text-zinc-800 w-6 text-center">{qty}</span>
        <button
          onClick={() => setQty(q => q + 1)}
          className="text-zinc-500 font-bold w-5 text-center"
        >+</button>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        className="flex-1 py-3 rounded-2xl border-2 border-pink-500 text-sm font-bold text-pink-500 hover:bg-pink-50 transition-colors"
      >
        🛍️ Add to Cart
      </button>

      {/* Buy now */}
      <button
        onClick={handleBuy}
        className="flex-1 py-3 rounded-2xl bg-pink-600 text-sm font-bold text-white hover:bg-pink-700 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
};

export default AddToCartBar;
