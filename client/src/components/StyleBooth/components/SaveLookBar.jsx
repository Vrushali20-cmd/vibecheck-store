/**
 * SaveLookBar
 * isAuthenticated: bool — shows save/cart for users, login wall for guests
 * onSave: fn
 * onAddAll: fn
 * onLoginPrompt: fn — called when guest clicks any action
 */
const SaveLookBar = ({ isAuthenticated, onSave, onAddAll, onLoginPrompt }) => (
  <div
    className="fixed bottom-0 inset-x-0 z-50 px-4 py-3 border-t backdrop-blur-md"
    style={{ background: 'var(--sb-card)', borderColor: 'var(--sb-border)' }}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

      {isAuthenticated ? (
        /* Logged-in actions */
        <>
          <p className="text-xs hidden md:block" style={{ color: 'var(--sb-sub)' }}>
            Love this look? Save it or add everything to your cart.
          </p>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={onSave}
              className="px-5 py-2.5 rounded-full border text-xs font-bold transition-all"
              style={{
                borderColor: 'var(--sb-accent)',
                color: 'var(--sb-accent)',
                background: 'transparent',
              }}
            >
              🤍 Save Look
            </button>
            <button
              onClick={onAddAll}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all"
              style={{ background: 'var(--sb-accent)' }}
            >
              🛍️ Add All to Cart
            </button>
          </div>
        </>
      ) : (
        /* Guest login wall */
        <>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--sb-text)' }}>
              Login to save this look & add to cart
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--sb-sub)' }}>
              Free to join · Takes 30 seconds
            </p>
          </div>
          <button
            onClick={onLoginPrompt}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--sb-accent)' }}
          >
            ✨ Login / Sign up
          </button>
        </>
      )}

    </div>
  </div>
);

export default SaveLookBar;
