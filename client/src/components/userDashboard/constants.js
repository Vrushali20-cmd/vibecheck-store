export const MOODS = {
  'Soft Girl': {
    eyebrow: 'Pastel / Romantic',
    display: "'Fraunces', serif",
    radius: '26px',
    motif: '🎀',
    light: { bg: 'linear-gradient(135deg,#FFF3F6 0%,#FBF0FF 55%,#FFF8F4 100%)', card: '#FFFFFF', text: '#3A2B3D', sub: '#8B7A91', accent: '#E8638C', accent2: '#B98CE0', border: '#F3DCE6' },
    dark:  { bg: 'linear-gradient(135deg,#241926 0%,#1C1320 60%,#2A1820 100%)', card: '#2B1F2E', text: '#F6E9EF', sub: '#B79FB8', accent: '#FF9FC2', accent2: '#D9AFFF', border: '#3E2E3F' },
  },
  'Y2K Cyber Chic': {
    eyebrow: 'Chrome / Static',
    display: "'Space Grotesk', sans-serif",
    radius: '6px',
    motif: '◈',
    light: { bg: 'linear-gradient(135deg,#E8E8F5 0%,#D6E8F0 100%)', card: '#FFFFFF', text: '#10121C', sub: '#5B5F77', accent: '#9AC400', accent2: '#E0218A', border: '#C9CCE0' },
    dark:  { bg: 'radial-gradient(circle at 20% 0%, #1A1530 0%, #0A0A12 60%)', card: '#14121F', text: '#E7E9FF', sub: '#8C8FB0', accent: '#C8FF4D', accent2: '#FF2E9A', border: '#2A2740' },
  },
  'Clean Minimal': {
    eyebrow: 'Quiet / Considered',
    display: "'Fraunces', serif",
    radius: '3px',
    motif: null,
    light: { bg: '#F6F4F0', card: '#FFFFFF', text: '#1B1B19', sub: '#76746C', accent: '#1B1B19', accent2: '#A89F8E', border: '#E5E1D8' },
    dark:  { bg: '#161513', card: '#1F1E1B', text: '#F1EFE9', sub: '#9B988D', accent: '#F1EFE9', accent2: '#A89F8E', border: '#2C2A26' },
  },
  'Indie Alternative': {
    eyebrow: 'Thrifted / Lo-fi',
    display: "'Space Grotesk', sans-serif",
    radius: '14px',
    motif: '🧷',
    light: { bg: 'linear-gradient(135deg,#F4ECE1 0%,#EFE3D8 100%)', card: '#FBF6EF', text: '#2E2620', sub: '#8A7C6B', accent: '#B5562C', accent2: '#5C6B4F', border: '#E1D3BF' },
    dark:  { bg: 'linear-gradient(135deg,#221C16 0%,#1A150F 100%)', card: '#27201A', text: '#F0E6D8', sub: '#A9967F', accent: '#E0824A', accent2: '#8FA177', border: '#3A2F25' },
  },
};

export const TICKER_ITEMS = [
  'SOLSTICE CAPSULE — UP TO 40% OFF',
  'FREE SHIPPING OVER ₹999',
  '1,450 VIBES IN YOUR LEDGER',
  'NEW DROP EVERY FRIDAY',
];

// Module-level so it's never rebuilt on re-render.
// Dynamic values (colors, fonts) live in --mood-* CSS vars on the root div.
export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,900&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .fx-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .fx-body { font-family: 'Inter', system-ui, sans-serif; }
  .fx-display { font-family: var(--font-display); }

  .fx-ticker-track { display: flex; gap: 3.5rem; white-space: nowrap; animation: fx-marquee 24s linear infinite; }
  @keyframes fx-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .fx-ticker-track { animation: none; } }

  button:focus-visible, a:focus-visible {
    outline: 2px solid var(--mood-accent);
    outline-offset: 2px;
    border-radius: 6px;
  }

  .fx-scrollbar-none::-webkit-scrollbar { display: none; }
  .fx-scrollbar-none { scrollbar-width: none; }
`;
