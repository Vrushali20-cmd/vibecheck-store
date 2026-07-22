const ProductInfo = ({ product }) => (
  <div>
    {/* Brand */}
    <span className="text-[11px] font-bold uppercase tracking-widest text-pink-500">
      {product.brand}
    </span>

    {/* Name */}
    <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 mt-1 leading-tight">
      {product.name}
    </h1>

    {/* Rating placeholder */}
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <span key={s} className="text-amber-400 text-sm">★</span>
        ))}
      </div>
      <span className="text-xs text-zinc-400">(24 reviews)</span>
    </div>

    {/* Price */}
    <div className="mt-4">
      <span className="text-3xl font-black text-pink-600">₹{product.price}</span>
      <span className="ml-2 text-sm text-zinc-400 line-through">
        ₹{Math.round(product.price * 1.3)}
      </span>
      <span className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
        23% off
      </span>
    </div>

    {/* Description */}
    <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
      {product.description}
    </p>

    {/* Category */}
    <div className="mt-4 flex items-center gap-2">
      <span className="text-xs text-zinc-400">Category:</span>
      <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-full">
        {product.category}
      </span>
    </div>
  </div>
);

export default ProductInfo;