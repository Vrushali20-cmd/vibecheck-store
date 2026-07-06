const STATS = [
  { value: '50K+', label: 'Looks built' },
  { value: '4.9★', label: 'Avg rating' },
  { value: '200+', label: 'New drops weekly' },
];

const GuestHero = ({ onLoginClick }) => (
  <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

    {/* Background glow blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--gd-accent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--gd-accent2)' }}
      />
    </div>

    {/* Floating motif */}
    <div className="gd-float text-6xl mb-6 select-none">✨</div>

    {/* Eyebrow */}
    <span
      className="gd-mono text-[10px] font-bold uppercase tracking-[0.25em] mb-4 px-3 py-1 rounded-full border"
      style={{ color: 'var(--gd-accent)', borderColor: 'var(--gd-accent)', background: 'rgba(232,99,140,0.08)' }}
    >
      AI-Powered Style Curation
    </span>

    {/* Headline */}
    <h1 className="gd-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-tight" style={{ color: 'var(--gd-text)' }}>
      Your complete look,{' '}
      <span style={{ color: 'var(--gd-accent)' }}>curated</span>{' '}
      in seconds.
    </h1>

    {/* Sub */}
    <p className="mt-5 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--gd-sub)' }}>
      Tell us the occasion. We pick the outfit, shoes, bag, jewellery and makeup — all perfectly matched.
    </p>

    {/* CTAs */}
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <button
        onClick={onLoginClick}
        className="px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
        style={{ background: 'linear-gradient(120deg, var(--gd-accent), var(--gd-accent2))' }}
      >
        Get Started Free →
      </button>
      <a
        href="/style-booth"
        className="px-8 py-3.5 rounded-full text-sm font-bold border transition-all hover:scale-105"
        style={{ borderColor: 'var(--gd-border)', color: 'var(--gd-text)' }}
      >
        ✨ Try Style Booth
      </a>
    </div>

    {/* Stats row */}
    <div className="mt-14 flex gap-10 flex-wrap justify-center">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="gd-display text-2xl font-bold" style={{ color: 'var(--gd-text)' }}>{s.value}</div>
          <div className="gd-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--gd-sub)' }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Scroll hint */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
      <div className="w-px h-8 rounded-full" style={{ background: 'var(--gd-sub)' }} />
      <span className="gd-mono text-[9px]" style={{ color: 'var(--gd-sub)' }}>scroll</span>
    </div>
  </section>
);

export default GuestHero;