import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts }  from '../../hooks/useProducts';
import { useWishlist }  from '../../hooks/useWishlist';

import { MOODS, GLOBAL_STYLES } from './constants';

import TopBar           from './components/TopBar';
import WelcomeBlock     from './components/WelcomeBlock';
import PromoTicker      from './components/PromoTicker';
import HeroBanner       from './components/HeroBanner';
import RewardsCard      from './components/RewardsCard';
import MoodSwitcher     from './components/MoodSwitcher';
import CategoryTabs     from './components/CategoryTabs';
import SearchBar        from '../../components/SearchBar';
import ProductGrid      from './components/ProductGrid';
import StyleCouncil     from './components/StyleCouncil';
import AIStyleAssembler from './components/AIStyleAssembler';
import FloatingButton   from './components/FloatingButton';

export default function UserDashboard({ setChatOpen, onAddToCart, onCartOpen }) {
  const navigate = useNavigate();

  // ── State ─────────────────────────────────────────────────────────────────
  const [activeMood,        setActiveMood]        = useState('Soft Girl');
  const [activeTab,         setActiveTab]         = useState('Dresses');
  const [notificationCount, setNotificationCount] = useState(3);
  const [isDarkMode,        setIsDarkMode]        = useState(false);
  const [filters,           setFilters]           = useState({
    search: '', minPrice: '', maxPrice: '', styleTag: '', sort: '',
  });

  // ── Backend data ───────────────────────────────────────────────────────────
  const { products, loading }              = useProducts(activeTab, filters);
  const { wishlist, toggleWishlist }       = useWishlist();

  // ── AI outfit state ────────────────────────────────────────────────────────
  const [aiOutfitBase, setAiOutfitBase] = useState('Beige Pleated Skirt');
  const [aiSuggestions, setAiSuggestions] = useState([
    { part: 'Top',       name: 'Pastel Cardigan Over-shirt',        matchScore: '98%' },
    { part: 'Footwear',  name: 'Chunky Retro Canvas Platforms',     matchScore: '94%' },
    { part: 'Accessory', name: 'Metallic Butterfly Hair Clips Set', matchScore: '91%' },
  ]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const triggerOutfitRec = (baseItem) => {
    setAiOutfitBase(baseItem);
    if (baseItem.includes('Skirt')) {
      setAiSuggestions([
        { part: 'Top',       name: 'Pastel Cardigan Over-shirt',        matchScore: '98%' },
        { part: 'Footwear',  name: 'Chunky Retro Canvas Platforms',     matchScore: '94%' },
        { part: 'Accessory', name: 'Metallic Butterfly Hair Clips Set', matchScore: '91%' },
      ]);
    } else {
      setAiSuggestions([
        { part: 'Layering', name: 'Oversized Cropped Denim Trucker',   matchScore: '96%' },
        { part: 'Boots',    name: 'High-Gloss Obsidian Combat Liners', matchScore: '92%' },
        { part: 'Eyewear',  name: 'Y2K Frameless Tinted Shades',       matchScore: '89%' },
      ]);
    }
  };

  const handleAddToCart = async (productId) => {
    if (onAddToCart) {
      await onAddToCart(productId);
      onCartOpen && onCartOpen();
    }
  };

  const handleBuyNow = async (productId) => {
    if (onAddToCart) {
      await onAddToCart(productId);
      navigate('/checkout');
    }
  };

  // ── Theme ──────────────────────────────────────────────────────────────────
  const mood = useMemo(() => MOODS[activeMood], [activeMood]);
  const theme = useMemo(() => mood[isDarkMode ? 'dark' : 'light'], [mood, isDarkMode]);
  const themeVars = useMemo(() => ({
    '--mood-bg':      theme.bg,
    '--mood-card':    theme.card,
    '--mood-text':    theme.text,
    '--mood-sub':     theme.sub,
    '--mood-accent':  theme.accent,
    '--mood-accent2': theme.accent2,
    '--mood-border':  theme.border,
    '--mood-radius':  mood.radius,
    '--font-display': mood.display,
    background: 'var(--mood-bg)',
    color:      'var(--mood-text)',
  }), [theme, mood]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={themeVars} className="min-h-screen transition-colors duration-500 font-sans">
      <style>{GLOBAL_STYLES}</style>

      <div className="fx-body pt-8 pb-32 px-4 md:px-8 max-w-7xl mx-auto relative">

        <TopBar
          mood={mood}
          notificationCount={notificationCount}
          isDarkMode={isDarkMode}
          onToggleDark={() => setIsDarkMode((v) => !v)}
        />

        <WelcomeBlock />
        <PromoTicker />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <HeroBanner mood={mood} />
          <RewardsCard />
        </div>

        <MoodSwitcher
          activeMood={activeMood}
          isDarkMode={isDarkMode}
          onSelect={setActiveMood}
        />

        <CategoryTabs activeTab={activeTab} onSelect={(tab) => {
          setActiveTab(tab);
          setFilters({ search: '', minPrice: '', maxPrice: '', styleTag: '', sort: '' });
        }} />

        <SearchBar filters={filters} onChange={setFilters} />

        {!loading && filters.search && (
          <p className="mt-3 text-xs fx-mono" style={{ color: 'var(--mood-sub)' }}>
            {products.length} result{products.length !== 1 ? 's' : ''} for "{filters.search}"
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductGrid
            products={products}
            loading={loading}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>

        <StyleCouncil />

        <AIStyleAssembler
          aiOutfitBase={aiOutfitBase}
          aiSuggestions={aiSuggestions}
          onSelectBase={triggerOutfitRec}
        />

      </div>

      <FloatingButton onClick={() => setChatOpen(true)} />
    </div>
  );
}
