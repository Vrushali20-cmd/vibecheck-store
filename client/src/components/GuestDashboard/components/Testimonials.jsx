import { TESTIMONIALS } from '../constants';

const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-amber-400 text-xs">★</span>
    ))}
  </div>
);

const Testimonials = () => (
  <section className="px-4 md:px-8 py-10">
    {/* Header */}
    <div className="text-center mb-8">
      <span
        className="gd-mono text-[10px] font-bold uppercase tracking-widest"
        style={{ color: 'var(--gd-accent)' }}
      >
        What They're Saying
      </span>
      <h2
        className="gd-display text-2xl font-medium mt-1"
        style={{ color: 'var(--gd-text)' }}
      >
        Real looks, real people
      </h2>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {TESTIMONIALS.map((t) => (
        <div
          key={t.handle}
          className="p-5 border flex flex-col gap-3"
          style={{
            background: 'var(--gd-card)',
            borderColor: 'var(--gd-border)',
            borderRadius: 'var(--gd-radius)',
          }}
        >
          <StarRow count={t.rating} />
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--gd-text)' }}>
            "{t.text}"
          </p>
          <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--gd-border)' }}>
            <span className="text-2xl">{t.avatar}</span>
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--gd-text)' }}>{t.name}</p>
              <p className="gd-mono text-[10px]" style={{ color: 'var(--gd-accent)' }}>{t.handle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
