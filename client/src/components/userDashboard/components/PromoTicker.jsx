import { TICKER_ITEMS } from '../constants';

const PromoTicker = () => (
  <div
    className="mt-6 overflow-hidden border-y py-2"
    style={{ borderColor: 'var(--mood-border)' }}
  >
    {/* Duplicated so the marquee loops seamlessly */}
    <div className="fx-ticker-track">
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span
          key={i}
          className="fx-mono text-[10px] font-bold tracking-wider"
          style={{ color: 'var(--mood-sub)' }}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default PromoTicker;