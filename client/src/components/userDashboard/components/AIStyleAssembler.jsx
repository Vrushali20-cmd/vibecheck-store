import Eyebrow from './Eyebrow';

const BASE_ITEMS = ['Beige Pleated Skirt', 'Obsidian Denim Jacket'];

const AIStyleAssembler = ({ aiOutfitBase, aiSuggestions, onSelectBase }) => (
  <div
    className="mt-14 p-7 md:p-8 border"
    style={{
      background: 'var(--mood-card)',
      borderColor: 'var(--mood-border)',
      borderRadius: 'var(--mood-radius)',
    }}
  >
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-3">
      <div>
        <h3
          className="fx-display text-xl font-medium tracking-tight"
          style={{ color: 'var(--mood-text)' }}
        >
          AI Style Assembler
        </h3>
        <p className="fx-mono text-[10px] mt-1 uppercase tracking-widest" style={{ color: 'var(--mood-sub)' }}>
          Neural Link: Active
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--mood-accent)' }} />
        <span className="fx-mono text-[10px] font-bold" style={{ color: 'var(--mood-accent)' }}>
          OPTIMIZED
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Left: base item selector */}
      <div className="lg:col-span-4 space-y-3">
        <Eyebrow style={{ color: 'var(--mood-sub)' }}>Input Baseline</Eyebrow>
        {BASE_ITEMS.map((item) => {
          const selected = aiOutfitBase === item;
          return (
            <button
              key={item}
              onClick={() => onSelectBase(item)}
              className="w-full p-4 rounded-2xl border-2 text-xs font-bold text-left transition-all duration-300 flex items-center gap-3"
              style={{
                borderColor: selected ? 'var(--mood-accent)' : 'var(--mood-border)',
                background:  selected ? 'var(--mood-accent)' : 'transparent',
                color:       selected ? '#fff'                : 'var(--mood-sub)',
              }}
            >
              <span className="text-base">{selected ? '✨' : '○'}</span>
              {item}
            </button>
          );
        })}
      </div>

      {/* Right: recommendation cards with confidence bar */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {aiSuggestions.map((sug, i) => {
          const score = parseInt(sug.matchScore, 10) || 0;
          return (
            <div
              key={i}
              className="relative rounded-2xl p-4 flex flex-col justify-between border transition-all"
              style={{ background: 'var(--mood-bg)', borderColor: 'var(--mood-border)' }}
            >
              <span className="fx-mono text-[9px] uppercase" style={{ color: 'var(--mood-sub)' }}>
                {sug.part}
              </span>
              <p className="text-xs font-semibold mt-2" style={{ color: 'var(--mood-text)' }}>
                {sug.name}
              </p>
              <div className="mt-4">
                <div className="flex items-end justify-between mb-1.5">
                  <span className="text-[10px]" style={{ color: 'var(--mood-sub)' }}>Confidence</span>
                  <span className="fx-mono text-[12px] font-black" style={{ color: 'var(--mood-accent)' }}>
                    {sug.matchScore}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--mood-border)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${score}%`, background: 'var(--mood-accent)' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);

export default AIStyleAssembler;