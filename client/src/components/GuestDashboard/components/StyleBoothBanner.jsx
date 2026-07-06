const STEPS = [
  { emoji: '🎯', label: 'Pick occasion' },
  { emoji: '🎨', label: 'Set your vibe' },
  { emoji: '✨', label: 'Get full look' },
];

const StyleBoothBanner = () => (
  <section className="px-4 md:px-8 py-6">
    <div
      className="relative rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
      style={{ background: 'linear-gradient(135deg, var(--gd-accent) 0%, var(--gd-accent2) 100%)' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[160px] flex items-center justify-end pr-8">
        🎀
      </div>

      {/* Left copy */}
      <div className="relative z-10">
        <span className="gd-mono text-[10px] font-bold uppercase tracking-widest text-white/70">
          Style Booth · AI Outfit Builder
        </span>
        <h2 className="gd-display text-3xl md:text-4xl font-medium text-white mt-2 max-w-md leading-tight">
          Build a complete matching look for any occasion
        </h2>

        {/* Steps */}
        <div className="flex gap-6 mt-5">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl">{s.emoji}</span>
              <span className="text-xs font-semibold text-white/80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a
        href="/style-booth"
        className="relative z-10 flex-shrink-0 px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105"
        style={{ background: '#fff', color: 'var(--gd-accent)' }}
      >
        Build My Look →
      </a>
    </div>
  </section>
);

export default StyleBoothBanner;