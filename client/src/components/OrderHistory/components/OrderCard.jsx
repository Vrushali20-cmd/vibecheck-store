const API_BASE = 'http://localhost:5000';

const STATUS_COLORS = {
  placed:    { bg: '#FFF7ED', text: '#C2410C' },
  confirmed: { bg: '#F0FDF4', text: '#15803D' },
  shipped:   { bg: '#EFF6FF', text: '#1D4ED8' },
  delivered: { bg: '#F0FDF4', text: '#15803D' },
  cancelled: { bg: '#FEF2F2', text: '#DC2626' },
};

const OrderCard = ({ order }) => {
  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.placed;
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-mono text-[10px] text-zinc-400">#{order._id.slice(-8).toUpperCase()}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{date}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold capitalize"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
          >
            {order.status}
          </span>
          <span className="text-[10px] text-zinc-400 capitalize">{order.paymentMethod}</span>
        </div>
      </div>

      {/* Items preview — max 3 images */}
      <div className="flex gap-2 mb-4">
        {order.items.slice(0, 3).map((item, i) => {
          const imgSrc = item.imageUrl?.startsWith('http')
            ? item.imageUrl
            : item.imageUrl
              ? `${API_BASE}${item.imageUrl}`
              : null;
          return (
            <div key={i} className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
              {imgSrc && <img src={imgSrc} alt={item.name} loading="lazy" className="w-full h-full object-cover" />}
            </div>
          );
        })}
        {order.items.length > 3 && (
          <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">
            +{order.items.length - 3}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
        <span className="text-[11px] text-zinc-400">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
        <span className="text-sm font-black text-pink-600">₹{order.total}</span>
      </div>
    </div>
  );
};

export default OrderCard;