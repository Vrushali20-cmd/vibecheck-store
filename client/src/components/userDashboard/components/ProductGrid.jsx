import { IconHeart } from './Icons';

const API_BASE = 'http://localhost:5000';

const ProductGrid = ({ products, loading, wishlist, onToggleWishlist, onAddToCart, onBuyNow }) => {
  if (loading) {
    return (
      <div className="col-span-full py-14 text-center fx-mono text-xs" style={{ color: 'var(--mood-accent)' }}>
        Fetching trends…
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full py-14 text-center text-sm" style={{ color: 'var(--mood-sub)' }}>
        No assets found in this category.
      </div>
    );
  }

  return (
    <>
      {products.map((product) => {
        // Fix: use _id string for comparison to prevent all-selected bug
        const productId = product._id?.toString();
        const saved     = productId ? wishlist.includes(productId) : false;

        const imgSrc = product.imageUrl?.startsWith('http')
          ? product.imageUrl
          : product.imageUrl
            ? `${API_BASE}${product.imageUrl}`
            : product.img;

        return (
          <div
            key={productId}
            className="group border overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            style={{
              background:   'var(--mood-card)',
              borderColor:  'var(--mood-border)',
              borderRadius: 'var(--mood-radius)',
            }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden" style={{ background: 'var(--mood-border)' }}>
              <img
                src={imgSrc}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Wishlist heart */}
              <button
                onClick={() => productId && onToggleWishlist(productId)}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm"
                style={{ color: saved ? 'var(--mood-accent)' : '#9CA3AF' }}
              >
                <IconHeart filled={saved} width={15} height={15} />
              </button>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col flex-1">
              <h4 className="text-xs font-semibold truncate" style={{ color: 'var(--mood-text)' }}>
                {product.name}
              </h4>
              <p className="fx-mono text-xs font-black mt-1" style={{ color: 'var(--mood-accent)' }}>
                ₹{product.price}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2 mt-2">
                {/* Add to Cart */}
                <button
                  onClick={() => onAddToCart && onAddToCart(productId)}
                  className="flex-1 py-1.5 text-[10px] rounded-lg font-bold transition-colors border"
                  style={{
                    borderColor: 'var(--mood-accent)',
                    color:       'var(--mood-accent)',
                    background:  'transparent',
                  }}
                >
                  🛍️ Cart
                </button>

                {/* Buy Now */}
                <button
                  onClick={() => onBuyNow && onBuyNow(productId)}
                  className="flex-1 py-1.5 text-[10px] rounded-lg font-bold text-white transition-colors"
                  style={{ background: 'var(--mood-accent)' }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductGrid;