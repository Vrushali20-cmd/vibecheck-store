const FloatingButton = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Ask the style AI"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-2xl font-bold text-sm"
    style={{ background: 'var(--mood-accent)', color: '#fff' }}
  >
    <span>✨</span>
    <span className="fx-mono text-[11px]">Ask Style AI</span>
  </button>
);

export default FloatingButton;
