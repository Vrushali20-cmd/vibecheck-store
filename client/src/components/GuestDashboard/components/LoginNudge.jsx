const LoginNudge = ({ onLoginClick }) => (
  <div
    className="fixed bottom-0 inset-x-0 z-50 px-4 py-3 border-t backdrop-blur-md"
    style={{ background: 'rgba(9,9,11,0.92)', borderColor: 'var(--gd-border)' }}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <div className="hidden sm:block">
        <p className="text-xs font-semibold" style={{ color: 'var(--gd-text)' }}>
          Save looks, track your style, unlock AI stylist
        </p>
        <p className="gd-mono text-[10px] mt-0.5" style={{ color: 'var(--gd-sub)' }}>
          Free forever · No credit card
        </p>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Social proof pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
          style={{ borderColor: 'var(--gd-border)' }}
        >
          <span className="flex -space-x-1">
            {['🧕','👩‍🎤','💁‍♀️'].map((a, i) => (
              <span key={i} className="text-base">{a}</span>
            ))}
          </span>
          <span className="gd-mono text-[10px]" style={{ color: 'var(--gd-sub)' }}>
            50K+ joined
          </span>
        </div>

        <button
          onClick={onLoginClick}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(120deg, var(--gd-accent), var(--gd-accent2))' }}
        >
          Join Free →
        </button>
      </div>
    </div>
  </div>
);

export default LoginNudge;