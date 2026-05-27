import React, { useState } from 'react';

export default function UserDashboard({ setChatOpen }) {
  // State Management
  const [activeMood, setActiveMood] = useState('Soft Girl');
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('Dresses');
  const [notificationCount, setNotificationCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // AI Outfit Recommendation State Engine
  const [aiOutfitBase, setAiOutfitBase] = useState('Beige Pleated Skirt');
  const [aiSuggestions, setAiSuggestions] = useState([
    { part: 'Top', name: 'Pastel Cardigan Over-shirt', matchScore: '98%' },
    { part: 'Footwear', name: 'Chunky Retro Canvas Platforms', matchScore: '94%' },
    { part: 'Accessory', name: 'Metallic Butterfly Hair Clips Set', matchScore: '91%' }
  ]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    if (!wishlist.includes(id)) {
      setNotificationCount(prev => prev + 1);
    }
  };

  // Data Dictionaries
  const categories = [
    { name: 'Dresses', icon: '👗' },
    { name: 'Makeup', icon: '💄' },
    { name: 'Bags', icon: '👜' },
    { name: 'Shoes', icon: '👟' },
    { name: 'Accessories', icon: '🎀' }
  ];

  const specificCatalog = {
    Dresses: [
      { id: 'dr-1', name: 'Pastel Organza Tiered Dress', price: 3499, oldPrice: 4999, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', tag: 'Trending', reviews: 48, photoReview: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { id: 'dr-2', name: 'Y2K Asymmetric Ruched Mini', price: 2890, oldPrice: 3800, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', tag: 'Limited Drop', reviews: 32, photoReview: null }
    ],
    Makeup: [
      { id: 'mk-1', name: 'Dewy Liquid Blush + Lip Tint Combo', price: 1250, oldPrice: 1800, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', tag: 'Beauty Bundle', reviews: 114, photoReview: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }
    ],
    Bags: [
      { id: 'bg-1', name: 'Chrome Metallic Cyber Shoulder Bag', price: 2100, oldPrice: 2999, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80', tag: 'Influencer Pick', reviews: 19, photoReview: null }
    ]
  };

  const influencerPicks = [
    { curator: '@kavya.vibe', lookName: 'Soft Matcha Aesthetic', itemsCount: 4, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
    { curator: '@ananya_cyber', lookName: 'Neo-Tokyo Midnight Transit', itemsCount: 3, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80' }
  ];

  const currentProducts = specificCatalog[activeTab] || specificCatalog['Dresses'];

  const triggerOutfitRec = (baseItem) => {
    setAiOutfitBase(baseItem);
    if (baseItem.includes('Skirt')) {
      setAiSuggestions([
        { part: 'Top', name: 'Pastel Cardigan Over-shirt', matchScore: '98%' },
        { part: 'Footwear', name: 'Chunky Retro Canvas Platforms', matchScore: '94%' },
        { part: 'Accessory', name: 'Metallic Butterfly Hair Clips Set', matchScore: '91%' }
      ]);
    } else {
      setAiSuggestions([
        { part: 'Layering', name: 'Oversized Cropped Denim Trucker', matchScore: '96%' },
        { part: 'Boots', name: 'High-Gloss Obsidian Combat Liners', matchScore: '92%' },
        { part: 'Eyewear', name: 'Y2K Frameless Tinted Shades', matchScore: '89%' }
      ]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0c1b] text-zinc-100' : 'bg-gradient-to-b from-[#fff2f5] via-[#f8f1ff] to-[#fffbfc]'} pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto font-sans relative`}>
      
      {/* 1. TOP UTILITY PANEL */}
      <div className="flex justify-between items-center pb-4 border-b border-pink-100/40">
        <div className="flex items-center gap-3">
          <span className="relative inline-block">
            🔔
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center font-mono">
                {notificationCount}
              </span>
            )}
          </span>
          <span className="text-xs font-mono text-zinc-400">Secure Vault Session</span>
        </div>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all border ${isDarkMode ? 'border-purple-500 bg-purple-950/40 text-purple-300' : 'border-pink-200 bg-white text-pink-600'}`}
        >
          {isDarkMode ? '🌙 DARK_MODE active' : '☀️ LIGHT_MODE active'}
        </button>
      </div>

      {/* 2. WELCOME BLOCK */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-pink-500 font-bold block uppercase">Curated For You // Status: Platinum VIP</span>
          <h1 className="text-3xl font-light tracking-tight mt-1">Hey Gorgeous, Welcome Back! ✨</h1>
        </div>
        
        <div className={`w-full md:w-80 relative flex items-center border rounded-full px-4 py-2.5 shadow-sm bg-white ${isDarkMode ? 'border-zinc-800' : 'border-pink-200/60'}`}>
          <input type="text" placeholder="Search aesthetics, trends, lip tints..." className="w-full text-xs outline-none bg-transparent text-zinc-800" />
          <span className="cursor-pointer text-xs filter grayscale hover:grayscale-0">🎛️</span>
        </div>
      </div>

      {/* 3. HERO BANNER */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-gradient-to-r from-[#ffd3dc] to-[#e4cbff] rounded-3xl p-6 flex flex-col justify-between min-h-[200px] relative overflow-hidden shadow-sm">
          <div className="absolute -right-4 -bottom-6 text-9xl opacity-15 pointer-events-none select-none">🎀</div>
          <div>
            <span className="bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold text-pink-600 uppercase tracking-wider">Flash Sale Terminal</span>
            <h2 className="text-2xl font-bold text-purple-950 tracking-tight mt-2 max-w-md">The Solstice Capsule Drop: Up to 40% Off Everything</h2>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between border-t border-white/40 pt-4 mt-4 font-mono text-xs text-purple-950">
            <div>⏱️ EXPIRES IN: <span className="bg-purple-950 text-white px-2 py-0.5 rounded text-xs font-bold font-mono">01:42:19</span></div>
            <div className="bg-purple-950 text-white text-[11px] px-4 py-2 rounded-xl font-bold font-sans cursor-pointer">Activate Offer ↗</div>
          </div>
        </div>

        <div className={`lg:col-span-4 border rounded-3xl p-6 flex flex-col justify-between ${isDarkMode ? 'bg-[#18132b] border-zinc-800' : 'bg-white border-pink-100'}`}>
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wide block">Rewards Ledger</span>
            <h3 className="text-lg font-bold mt-1 text-zinc-100">Your Available Coupons</h3>
          </div>
          <div className="space-y-2 mt-2">
            <div className="border border-dashed border-pink-300 bg-pink-500/5 rounded-xl p-2.5 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-pink-500">CODE: COUTURE20</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">Extra 20% off items over ₹3000</p>
              </div>
              <span className="text-xs bg-pink-500 text-white font-bold px-2 py-1 rounded">Copy</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 mt-3 font-mono">Current points status: <span className="text-pink-500 font-bold">1,450 VIBES</span></p>
        </div>
      </div>

      {/* 4. AESTHETIC TOGGLE HUB */}
      <div className={`mt-10 border p-6 rounded-2xl ${isDarkMode ? 'bg-[#151026] border-pink-500/10' : 'bg-white border-pink-100'}`}>
        <div className="border-b border-zinc-800/20 pb-2 mb-4">
          <span className="text-[9px] font-mono font-bold text-pink-500 tracking-widest block uppercase">Aesthetic Engine Pipeline</span>
          <h3 className="text-sm font-bold mt-0.5 text-zinc-800">Switch Core Styling Perspective</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Soft Girl', 'Y2K Cyber Chic', 'Clean Minimal', 'Indie Alternative'].map(mood => (
            <button
              key={mood} onClick={() => setActiveMood(mood)}
              className={`p-3 text-xs font-mono font-bold rounded-xl border transition-all text-left ${
                activeMood === mood 
                  ? 'border-pink-500 bg-pink-500/10 text-pink-600 shadow-sm' 
                  : 'border-zinc-800/10 bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              {activeMood === mood ? '✦ ' : '◇ '} {mood}
            </button>
          ))}
        </div>
      </div>

      {/* 5. CATEGORIES */}
      <div className="mt-12 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.name} onClick={() => setActiveTab(cat.name)}
            className={`px-5 py-3 rounded-full text-xs font-semibold shadow-sm transition-all shrink-0 flex items-center gap-2 border ${
              activeTab === cat.name 
                ? 'bg-purple-950 text-white border-purple-950 font-bold' 
                : 'bg-white text-zinc-700 border-pink-100 hover:border-pink-300'
            }`}
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* 6. PRODUCT GRID */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentProducts.map(product => (
          <div key={product.id} className={`group border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-[#18132b] border-zinc-800' : 'bg-white border-pink-100'}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
              <span className="absolute top-3 left-3 z-10 bg-white/90 border border-pink-100 text-[9px] font-mono font-bold text-pink-600 px-2 py-0.5 rounded uppercase">
                {product.tag}
              </span>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow text-xs"
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
            </div>

            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold tracking-tight text-zinc-100">{product.name}</h4>
                <div className="flex gap-2 items-baseline mt-1">
                  <span className="text-sm font-black text-pink-600">₹{product.price}</span>
                  <span className="text-xs text-zinc-400 line-through font-mono">₹{product.oldPrice}</span>
                </div>
              </div>

              {product.photoReview && (
                <div className="bg-zinc-900/40 border border-zinc-800/40 p-2 rounded-xl flex items-center gap-3">
                  <img src={product.photoReview} alt="" className="w-8 h-8 rounded-lg object-cover border border-zinc-700" />
                  <p className="text-[10px] text-zinc-400 leading-tight italic">"Fits perfectly! True to sizing indexes." &mdash; ⭐⭐⭐⭐⭐</p>
                </div>
              )}

              <button className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white font-bold text-xs rounded-xl shadow-md">
                Secure Allocation Setup
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 7. AI ASSEMBLE */}
      <div className={`mt-14 border p-6 rounded-2xl ${isDarkMode ? 'bg-[#151029] border-purple-500/20' : 'bg-white border-pink-100'}`}>
        <div className="border-b border-zinc-800/10 pb-3 mb-6">
          <span className="text-[9px] font-mono bg-pink-600 text-white font-black px-2 py-0.5 rounded tracking-widest uppercase">AI Stylist Algorithm Block</span>
          <h3 className="text-base font-semibold tracking-tight text-zinc-800 mt-2">"Complete The Look" Auto-Assembler</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs text-zinc-400 font-mono">Selected Baseline Item Variable:</p>
            {['Beige Pleated Skirt', 'Obsidian Denim Jacket'].map(item => (
              <button
                key={item} onClick={() => triggerOutfitRec(item)}
                className={`w-full p-3 rounded-xl border text-xs font-mono font-bold text-left transition-all ${aiOutfitBase === item ? 'border-pink-500 bg-pink-500/5 text-pink-600' : 'border-zinc-800 bg-zinc-900/20 text-zinc-400'}`}
              >
                ⚙️ {item}
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-black/20 border border-zinc-800/80 p-4 rounded-xl space-y-2 font-mono text-xs text-zinc-300">
            {aiSuggestions.map((sug, i) => (
              <div key={i} className="flex justify-between items-center bg-zinc-900/40 p-2 rounded border border-zinc-900">
                <p><span className="text-zinc-500 font-bold font-mono">[{sug.part}]:</span> {sug.name}</p>
                <span className="text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded text-[10px]">Match: {sug.matchScore}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. INFLUENCER FEED */}
      <div className="mt-16">
        <div className="border-b border-pink-100 pb-3 mb-6">
          <span className="text-[9px] font-mono font-bold tracking-widest text-pink-500 uppercase block">Curator Matrix Feed</span>
          <h3 className="text-base font-semibold text-zinc-800 tracking-tight">Influencer Collection Boards</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {influencerPicks.map((pick, i) => (
            <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-pink-100 group shadow-sm">
              <img src={pick.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <p className="text-xs font-mono font-bold text-pink-400">{pick.curator}</p>
                <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">{pick.lookName}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. BOTTOM NAV */}
      <div className="fixed bottom-4 inset-x-4 max-w-sm mx-auto z-50 bg-white/95 backdrop-blur-md border border-pink-100/80 p-3 rounded-full shadow-2xl flex justify-around items-center">
        <button className="text-xl p-2.5 hover:bg-pink-50 rounded-full transition-all">🏠</button>
        <button onClick={() => setChatOpen(true)} className="text-xl p-2.5 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-full transition-transform shadow-md hover:scale-105 active:scale-95">✨</button>
        <button className="text-xl p-2.5 relative hover:bg-pink-50 rounded-full transition-all">
          ❤️ {wishlist.length > 0 && <span className="absolute top-0 right-0 h-4 w-4 bg-pink-600 text-[8px] font-black font-mono text-white rounded-full flex items-center justify-center">{wishlist.length}</span>}
        </button>
        <button className="text-xl p-2.5 hover:bg-pink-50 rounded-full transition-all">👤</button>
      </div>

    </div>
  );
}