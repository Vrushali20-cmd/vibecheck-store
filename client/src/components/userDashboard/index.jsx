import { useState, useMemo } from 'react';
import { useProducts } from "../../hooks/useProducts";

import { MOODS, GLOBAL_STYLES } from './constants';

import TopBar          from './components/TopBar';
import WelcomeBlock    from './components/WelcomeBlock';
import PromoTicker     from './components/PromoTicker';
import HeroBanner      from './components/HeroBanner';
import RewardsCard     from './components/RewardsCard';
import MoodSwitcher    from './components/MoodSwitcher';
import CategoryTabs    from './components/CategoryTabs';
import ProductGrid     from './components/ProductGrid';
import StyleCouncil    from './components/StyleCouncil';
import AIStyleAssembler from './components/AIStyleAssembler';
import FloatingButton  from './components/FloatingButton';

export default function UserDashboard({ setChatOpen }) {

  // ── State ────────────────────────────────────────────────────────────────
  const [activeMood,         setActiveMood]         = useState('Soft Girl');
  const [wishlist,           setWishlist]           = useState([]);
  const [activeTab,          setActiveTab]          = useState('Dresses');
  const [notificationCount,  setNotificationCount]  = useState(3);
  const [isDarkMode,         setIsDarkMode]         = useState(false);

  // ── Backend data (unchanged wiring) ──────────────────────────────────────
  const { products, loading } = useProducts(activeTab);

  // ── AI outfit state ───────────────────────────────────────────────────────
  const [aiOutfitBase, setAiOutfitBase] = useState('Beige Pleated Skirt');
  const [aiSuggestions, setAiSuggestions] = useState([
    { part: 'Top',       name: 'Pastel Cardigan Over-shirt',      matchScore: '98%' },
    { part: 'Footwear',  name: 'Chunky Retro Canvas Platforms',   matchScore: '94%' },
    { part: 'Accessory', name: 'Metallic Butterfly Hair Clips Set', matchScore: '91%' },
  ]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (!wishlist.includes(id)) setNotificationCount((prev) => prev + 1);
  };

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
        { part: 'Layering', name: 'Oversized Cropped Denim Trucker',  matchScore: '96%' },
        { part: 'Boots',    name: 'High-Gloss Obsidian Combat Liners', matchScore: '92%' },
        { part: 'Eyewear',  name: 'Y2K Frameless Tinted Shades',       matchScore: '89%' },
      ]);
    }
  };

  // ── Theme derivation (memoized — only reruns when mood/dark changes) ──────
  const mood = useMemo(() => MOODS[activeMood], [activeMood]);

  const theme = useMemo(
    () => mood[isDarkMode ? 'dark' : 'light'],
    [mood, isDarkMode]
  );

  const themeVars = useMemo(
    () => ({
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
    }),
    [theme, mood]
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={themeVars} className="min-h-screen transition-colors duration-500 font-sans">

      {/* Static styles — defined at module level in constants.js, never rebuilt */}
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

        {/* Hero + Rewards side-by-side */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <HeroBanner mood={mood} />
          <RewardsCard />
        </div>

        <MoodSwitcher
          activeMood={activeMood}
          isDarkMode={isDarkMode}
          onSelect={setActiveMood}
        />

        <CategoryTabs activeTab={activeTab} onSelect={setActiveTab} />

        {/* Product grid wrapper — keeps the responsive grid cols here, not in the child */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductGrid
            products={products}
            loading={loading}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
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
