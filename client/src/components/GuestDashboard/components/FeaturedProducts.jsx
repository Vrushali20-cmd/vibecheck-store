import GuestProductCard from './GuestProductCard';

const FeaturedProducts = ({ products, loading, onLoginClick }) => (
  <section className="px-4 md:px-8 py-10">
    {/* Header */}
    <div className="flex items-end justify-between mb-6">
      <div>
        <span
          className="gd-mono text-[10px] font-bold uppercase tracking-widest"
          style={{ color: 'var(--gd-accent)' }}
        >
          Trending Now
        </span>
        <h2
          className="gd-display text-2xl font-medium mt-1"
          style={{ color: 'var(--gd-text)' }}
        >
          Curated Picks
        </h2>
      </div>
      <a
        href="/style-booth"
        className="gd-mono text-[10px] font-bold uppercase tracking-wider"
        style={{ color: 'var(--gd-sub)' }}
      >
        See full collection →
      </a>
    </div>

    {/* Grid */}
    {loading ? (
      <div
        className="py-16 text-center gd-mono text-xs animate-pulse"
        style={{ color: 'var(--gd-accent)' }}
      >
        Loading picks…
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 8).map((item) => (
          <GuestProductCard
            key={item._id}
            item={item}
            onLoginClick={onLoginClick}
          />
        ))}
      </div>
    )}
  </section>
);

export default FeaturedProducts;