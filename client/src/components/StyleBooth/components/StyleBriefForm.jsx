import { BUDGET_RANGES, COLOR_VIBES, OCCASIONS } from '../constants';

const StyleBriefForm = ({ occasion, brief, onChange }) => {
  const occ = OCCASIONS.find((o) => o.id === occasion);

  const set = (key, value) => onChange({ ...brief, [key]: value });

  return (
    <div>
      <div className="mb-6">
        <span className="fx-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--sb-accent)' }}>
          Step 2 of 2 · {occ?.emoji} {occ?.label}
        </span>
        <h2 className="fx-display text-2xl md:text-3xl font-medium mt-1" style={{ color: 'var(--sb-text)' }}>
          Quick style brief
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--sb-sub)' }}>
          30 seconds and we're done.
        </p>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--sb-text)' }}>
          Budget per item
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {BUDGET_RANGES.map((b) => {
            const sel = brief.budgetId === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onChange({ ...brief, budgetId: b.id, budgetMax: b.max })}
                className="px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all"
                style={{
                  borderColor: sel ? 'var(--sb-accent)' : 'var(--sb-border)',
                  background:  sel ? 'var(--sb-accent)' : 'transparent',
                  color:       sel ? '#fff'              : 'var(--sb-sub)',
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color vibe */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--sb-text)' }}>
          Colour direction
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLOR_VIBES.map((cv) => {
            const sel = brief.colorVibe === cv.id;
            return (
              <button
                key={cv.id}
                onClick={() => set('colorVibe', cv.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-semibold transition-all"
                style={{
                  borderColor: sel ? 'var(--sb-accent)' : 'var(--sb-border)',
                  background:  sel ? 'var(--sb-accent)' : 'var(--sb-card)',
                  color:       sel ? '#fff'              : 'var(--sb-text)',
                }}
              >
                {/* Swatch dots */}
                <span className="flex gap-0.5">
                  {cv.swatch.map((s, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: s }} />
                  ))}
                </span>
                {cv.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StyleBriefForm;