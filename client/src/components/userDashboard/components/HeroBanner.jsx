const HeroBanner = ({ mood }) => (
  <div
    className="lg:col-span-8 p-7 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
    style={{
      background: 'linear-gradient(120deg, var(--mood-accent) 0%, var(--mood-accent2) 100%)',
      borderRadius: 'var(--mood-radius)',
    }}
  >
    {/* Decorative motif — null for Clean Minimal */}
    {mood.motif && (
      <div className="absolute -right-2 -bottom-6 text-9xl opacity-15 pointer-events-none select-none">
        {mood.motif}
      </div>
    )}

    <div>
      <span className="fx-mono inline-block bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-zinc-800">
        Flash Sale Terminal
      </span>
      <h2 className="fx-display text-2xl md:text-3xl font-medium tracking-tight mt-3 max-w-md text-white drop-shadow-sm">
        The Solstice Capsule Drop: Up to 40% Off Everything
      </h2>
    </div>
  </div>
);

export default HeroBanner;
