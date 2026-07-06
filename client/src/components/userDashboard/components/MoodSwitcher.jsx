import { MOODS } from '../constants';

const MoodSwitcher = ({ activeMood, isDarkMode, onSelect }) => (
  <div
    className="mt-10 border p-6"
    style={{
      background: 'var(--mood-card)',
      borderColor: 'var(--mood-border)',
      borderRadius: 'var(--mood-radius)',
    }}
  >
    <h3
      className="fx-display text-base font-medium mb-4"
      style={{ color: 'var(--mood-text)' }}
    >
      Switch Core Styling Perspective
    </h3>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Object.keys(MOODS).map((key) => {
        const m = MOODS[key];
        const t = m[isDarkMode ? 'dark' : 'light'];
        const selected = activeMood === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="p-3 rounded-xl border-2 text-left transition-all"
            style={{
              borderColor: selected ? t.accent : 'var(--mood-border)',
              background: selected ? t.card : 'transparent',
              boxShadow: selected ? `0 4px 16px -4px ${t.accent}55` : 'none',
            }}
          >
            {/* Colour swatch dots */}
            <div className="flex gap-1 mb-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: t.accent }} />
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: t.accent2 }} />
            </div>
            <span
              className="fx-mono text-[10px] font-bold block"
              style={{ fontFamily: m.display, color: selected ? t.text : 'var(--mood-sub)' }}
            >
              {key}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default MoodSwitcher;