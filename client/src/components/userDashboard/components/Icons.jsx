export const IconBell = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 4-1.5 5.5-1.5 7.5h15C18 13.5 18 12 18 8Z" />
    <path d="M10.5 19a1.5 1.5 0 0 0 3 0" />
  </svg>
);

export const IconHeart = ({ filled, ...p }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M12 20s-7.2-4.6-9.8-9.3C.6 7.6 2 4 5.4 3.4 7.7 3 10 4.3 12 7c2-2.7 4.3-4 6.6-3.6 3.4.6 4.8 4.2 3.2 7.3C19.2 15.4 12 20 12 20Z" />
  </svg>
);

export const IconMoon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.6 14.7A8.6 8.6 0 1 1 9.3 3.4a7 7 0 0 0 11.3 11.3Z" />
  </svg>
);

export const IconSun = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </svg>
);

export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);