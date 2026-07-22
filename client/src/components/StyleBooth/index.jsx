import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyleBooth } from '../../hooks/useStyleBooth';

import OccasionSelector from './components/OccasionSelector';
import StyleBriefForm   from './components/StyleBriefForm';
import OutfitBoard      from './components/OutfitBoard';
import SaveLookBar      from './components/SaveLookBar';

// CSS custom properties for the StyleBooth theme.
// Neutral palette that doesn't clash with UserDashboard's mood system.
const THEME = {
  '--sb-bg':      '#F7F4F0',
  '--sb-card':    '#FFFFFF',
  '--sb-text':    '#1C1917',
  '--sb-sub':     '#78716C',
  '--sb-accent':  '#E8638C',
  '--sb-border':  '#E7E2DC',
  background: 'var(--sb-bg)',
  color: 'var(--sb-text)',
};

const STEPS = ['occasion', 'brief', 'board'];

const STATIC_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
  .fx-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .fx-display { font-family: 'Fraunces', serif; }
`;

export default function StyleBooth({ isAuthenticated, onLoginPrompt }) {
  const navigate = useNavigate();

  // ── Stepper state ─────────────────────────────────────────────────────────
  const [step,     setStep]     = useState(0); // 0=occasion, 1=brief, 2=board
  const [occasion, setOccasion] = useState(null);
  const [brief,    setBrief]    = useState({
    budgetId:  'mid',
    budgetMax: 5000,
    colorVibe: 'pastels',
  });

  // ── Data — only fires when step === 2 ────────────────────────────────────
  const { look, loading, error } = useStyleBooth(
    step === 2 ? occasion : null,
    step === 2 ? brief    : null,
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleOccasionNext = (occ) => {
    setOccasion(occ);
    setStep(1);
  };

  const handleBriefNext = () => setStep(2);

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSave = () => {
    // TODO: POST look to /api/saved-looks when endpoint is ready
    alert('Look saved! (wire up your save endpoint here)');
  };

  const handleAddAll = () => {
    // TODO: add each product in look to cart
    alert('Added to cart! (wire up your cart endpoint here)');
  };

  // ── Step progress bar widths ───────────────────────────────────────────────
  const progress = ['33%', '66%', '100%'][step];

  return (
    <div style={THEME} className="min-h-screen font-sans">
      <style>{STATIC_STYLES}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ background: 'var(--sb-card)', borderColor: 'var(--sb-border)' }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-sm font-semibold flex items-center gap-1"
              style={{ color: 'var(--sb-sub)' }}
            >
              ← Back
            </button>
            <span className="fx-mono text-[11px] font-bold" style={{ color: 'var(--sb-text)' }}>
              Style Booth
            </span>
          </div>
          {/* Step indicator */}
          <span className="fx-mono text-[10px]" style={{ color: 'var(--sb-sub)' }}>
            {STEPS[step] === 'occasion' && 'Occasion →'}
            {STEPS[step] === 'brief'    && 'Style Brief →'}
            {STEPS[step] === 'board'    && 'Your Look ✓'}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 w-full" style={{ background: 'var(--sb-border)' }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: progress, background: 'var(--sb-accent)' }}
          />
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10 pb-28">

        {/* Step 1 — Occasion */}
        {step === 0 && (
          <>
            <OccasionSelector selected={occasion} onSelect={handleOccasionNext} />
          </>
        )}

        {/* Step 2 — Brief */}
        {step === 1 && (
          <>
            <StyleBriefForm
              occasion={occasion}
              brief={brief}
              onChange={setBrief}
            />
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-full border text-sm font-semibold"
                style={{ borderColor: 'var(--sb-border)', color: 'var(--sb-sub)' }}
              >
                ← Back
              </button>
              <button
                onClick={handleBriefNext}
                disabled={!brief.budgetId}
                className="px-8 py-3 rounded-full text-sm font-bold text-white disabled:opacity-40"
                style={{ background: 'var(--sb-accent)' }}
              >
                Build My Look →
              </button>
            </div>
          </>
        )}

        {/* Step 3 — Outfit Board */}
        {step === 2 && (
          <>
            {loading && (
              <div className="py-20 text-center">
                <div className="fx-mono text-sm animate-pulse" style={{ color: 'var(--sb-accent)' }}>
                  Assembling your look…
                </div>
              </div>
            )}

            {error && (
              <div className="py-20 text-center">
                <p className="text-sm" style={{ color: 'var(--sb-sub)' }}>{error}</p>
                <button
                  onClick={handleBack}
                  className="mt-4 px-6 py-2.5 rounded-full border text-sm font-semibold"
                  style={{ borderColor: 'var(--sb-accent)', color: 'var(--sb-accent)' }}
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && look && (
              <>
                <OutfitBoard occasion={occasion} look={look} />
                <div className="mt-6">
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full border text-xs font-semibold"
                    style={{ borderColor: 'var(--sb-border)', color: 'var(--sb-sub)' }}
                  >
                    ← Change brief
                  </button>
                </div>
              </>
            )}
          </>
        )}

      </div>

      {/* ── SaveLookBar — only shown on the board step ───────────────────── */}
      {step === 2 && !loading && look && (
        <SaveLookBar
          isAuthenticated={isAuthenticated}
          onSave={handleSave}
          onAddAll={handleAddAll}
          onLoginPrompt={onLoginPrompt}
        />
      )}
    </div>
  );
}
