import OutfitCard from './OutfitCard';
import { LOOK_CATEGORIES, OCCASIONS } from '../constants';

const OutfitBoard = ({ occasion, look }) => {
  const occ = OCCASIONS.find((o) => o.id === occasion);

  // Overall average match score across items that exist
  const scores = LOOK_CATEGORIES
    .map(({ key }) => look?.[key]?.matchScore)
    .filter(Boolean)
    .map((s) => parseInt(s, 10));
  const avgScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  return (
    <div>
      {/* Board header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <span className="fx-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--sb-accent)' }}>
            Your Complete Look
          </span>
          <h2 className="fx-display text-2xl md:text-3xl font-medium mt-1" style={{ color: 'var(--sb-text)' }}>
            {occ?.emoji} {occ?.label} Outfit Board
          </h2>
        </div>
        {avgScore > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: 'var(--sb-accent)', background: 'var(--sb-card)' }}
          >
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--sb-accent)' }} />
            <span className="fx-mono text-sm font-black" style={{ color: 'var(--sb-accent)' }}>
              {avgScore}% Overall Match
            </span>
          </div>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {LOOK_CATEGORIES.map(({ key, label, emoji }) => (
          <OutfitCard
            key={key}
            label={label}
            emoji={emoji}
            item={look?.[key] ?? null}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitBoard;
