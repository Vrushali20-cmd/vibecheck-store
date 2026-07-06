import MatchBadge from './MatchBadge';

const API_BASE = 'http://localhost:5000';

const OutfitCard = ({ label, emoji, item }) => {
  // item can be null if backend returned no products for this category
  if (!item) {
    return (
      <div
        className="rounded-2xl border-2 border-dashed p-4 flex flex-col items-center justify-center min-h-[220px] gap-2 opacity-40"
        style={{ borderColor: 'var(--sb-border)' }}
      >
        <span className="text-3xl">{emoji}</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--sb-sub)' }}>
          No {label} found
        </span>
      </div>
    );
  }

  const { product, matchScore } = item;
  const imgSrc = product.imageUrl?.startsWith('http')
  ? product.imageUrl
  : product.imageUrl
    ? `${API_BASE}${product.imageUrl}`
    : product.img;

  return (
    <div
      className="rounded-2xl border overflow-hidden flex flex-col group transition-transform hover:-translate-y-1"
      style={{ background: 'var(--sb-card)', borderColor: 'var(--sb-border)' }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden" style={{ background: 'var(--sb-border)' }}>
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category pill */}
        <span
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold fx-mono uppercase backdrop-blur-sm"
          style={{ background: 'var(--sb-accent)', color: '#fff' }}
        >
          {emoji} {label}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5">
        <h4 className="text-xs font-semibold leading-snug" style={{ color: 'var(--sb-text)' }}>
          {product.name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="fx-mono text-xs font-black" style={{ color: 'var(--sb-accent)' }}>
            ₹{product.price}
          </span>
          <MatchBadge score={matchScore} />
        </div>
        {/* Confidence bar */}
        <div
          className="h-1 rounded-full mt-1 overflow-hidden"
          style={{ background: 'var(--sb-border)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: matchScore,
              background: 'var(--sb-accent)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;