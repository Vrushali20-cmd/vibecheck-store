import { OCCASIONS } from '../constants';

const OccasionSelector = ({ selected, onSelect }) => (
  <div>
    <div className="mb-6">
      <span className="fx-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--sb-accent)' }}>
        Step 1 of 2
      </span>
      <h2 className="fx-display text-2xl md:text-3xl font-medium mt-1" style={{ color: 'var(--sb-text)' }}>
        What's the occasion?
      </h2>
      <p className="text-sm mt-1" style={{ color: 'var(--sb-sub)' }}>
        We'll build a complete matching look around it.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {OCCASIONS.map((occ) => {
        const isSelected = selected === occ.id;
        return (
          <button
            key={occ.id}
            onClick={() => onSelect(occ.id)}
            className="p-4 rounded-2xl border-2 text-left transition-all duration-200"
            style={{
              borderColor:  isSelected ? 'var(--sb-accent)'  : 'var(--sb-border)',
              background:   isSelected ? 'var(--sb-accent)'  : 'var(--sb-card)',
              boxShadow:    isSelected ? '0 4px 20px -4px var(--sb-accent)' : 'none',
            }}
          >
            <span className="text-3xl block mb-2">{occ.emoji}</span>
            <span
              className="text-sm font-bold block"
              style={{ color: isSelected ? '#fff' : 'var(--sb-text)' }}
            >
              {occ.label}
            </span>
            <span
              className="text-[11px] mt-0.5 block leading-snug"
              style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--sb-sub)' }}
            >
              {occ.desc}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default OccasionSelector;
