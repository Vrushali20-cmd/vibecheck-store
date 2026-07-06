// Fixed dark theme — all CSS custom properties for GuestDashboard
export const DARK_THEME = {
  '--gd-bg':      '#09090B',
  '--gd-card':    '#111113',
  '--gd-card2':   '#18181B',
  '--gd-text':    '#F4F4F5',
  '--gd-sub':     '#71717A',
  '--gd-accent':  '#E8638C',
  '--gd-accent2': '#B98CE0',
  '--gd-border':  '#27272A',
  '--gd-radius':  '16px',
  background: 'var(--gd-bg)',
  color: 'var(--gd-text)',
};

export const STATIC_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
  .gd-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .gd-display { font-family: 'Fraunces', serif; }
  .gd-body    { font-family: 'Inter', system-ui, sans-serif; }

  .gd-scrollbar-none::-webkit-scrollbar { display: none; }
  .gd-scrollbar-none { scrollbar-width: none; }

  @keyframes gd-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  .gd-float { animation: gd-float 4s ease-in-out infinite; }
`;

export const TESTIMONIALS = [
  {
    name: 'Priya S.',
    handle: '@priya.styles',
    text: 'Built my entire wedding guest look in under 2 minutes. Everything matched perfectly.',
    avatar: '🧕',
    rating: 5,
  },
  {
    name: 'Ananya R.',
    handle: '@ananya_cyber',
    text: 'The Y2K mood is actually real — this app just gets my aesthetic.',
    avatar: '👩‍🎤',
    rating: 5,
  },
  {
    name: 'Kavya M.',
    handle: '@kavya.vibe',
    text: 'Found my Diwali outfit, shoes, jewellery and makeup palette in one go. Obsessed.',
    avatar: '💁‍♀️',
    rating: 5,
  },
  {
    name: 'Sneha T.',
    handle: '@sneha.fits',
    text: 'Finally an app that curates a full look and not just random products.',
    avatar: '🙋‍♀️',
    rating: 5,
  },
];