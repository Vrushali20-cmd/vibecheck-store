const API_BASE = 'http://localhost:5000';

const GuestProductCard = ({ item, onLoginClick }) => {
  const imgSrc = item.imageUrl?.startsWith('http')
  ? item.imageUrl
  : item.imageUrl
    ? `${API_BASE}${item.imageUrl}`
    : item.img;
  return (
    <div
      className="group border overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
      style={{
        background: 'var(--gd-card)',
        borderColor: 'var(--gd-border)',
        borderRadius: 'var(--gd-radius)',
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: 'var(--gd-card2)' }}>
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Login overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(9,9,11,0.65)', backdropFilter: 'blur(4px)' }}
        >
          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-full text-xs font-bold text-white"
            style={{ background: 'var(--gd-accent)' }}
          >
            Login to save
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-xs font-semibold truncate" style={{ color: 'var(--gd-text)' }}>
          {item.name}
        </h4>
        <div className="flex items-center justify-between mt-1.5">
          <span className="gd-mono text-xs font-black" style={{ color: 'var(--gd-accent)' }}>
            ₹{item.price}
          </span>
          {item.styleTags?.[0] && (
            <span
              className="gd-mono text-[9px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: 'var(--gd-border)', color: 'var(--gd-sub)' }}
            >
              {item.styleTags[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestProductCard;