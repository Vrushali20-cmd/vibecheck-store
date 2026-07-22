const API_BASE = 'https://vibecheck-backend-hyhv.onrender.com';

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const { product, quantity, size, color, _id } = item;
  if (!product) return null;

  const imgSrc = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : product.imageUrl
      ? `${API_BASE}${product.imageUrl}`
      : null;

  return (
    <div className="flex gap-3 py-4 border-b border-zinc-100">
      {/* Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-pink-50">
        {imgSrc && (
          <img src={imgSrc} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-zinc-800 truncate">{product.name}</h4>
        <p className="text-[10px] text-zinc-400 mt-0.5">
          {[size, color].filter(Boolean).join(' · ')}
        </p>
        <p className="text-xs font-black text-pink-600 mt-1">₹{product.price}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQty(_id, quantity - 1)}
            className="w-6 h-6 rounded-full border border-zinc-200 text-zinc-600 text-xs flex items-center justify-center hover:bg-zinc-100"
          >
            −
          </button>
          <span className="text-xs font-bold text-zinc-700 w-4 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQty(_id, quantity + 1)}
            className="w-6 h-6 rounded-full border border-zinc-200 text-zinc-600 text-xs flex items-center justify-center hover:bg-zinc-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(_id)}
        className="text-zinc-300 hover:text-red-400 text-lg flex-shrink-0 self-start mt-1"
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;
