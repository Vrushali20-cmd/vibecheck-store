import React from 'react';

export default function ProductCard({ item }) {
  // Safe dynamic layout fallback mappings for major platforms
  const platformConfig = {
    clothing: {
      name: "Myntra",
      color: "from-pink-500 to-rose-500",
      bgGlow: "group-hover:border-pink-500/40",
      textColor: "text-pink-400",
      url: `https://www.myntra.com/search?q=${encodeURIComponent(item.name || 'fashion')}`
    },
    accessories: {
      name: "Meesho",
      color: "from-fuchsia-600 to-purple-600",
      bgGlow: "group-hover:border-fuchsia-500/40",
      textColor: "text-fuchsia-400",
      url: `https://www.meesho.com/search?q=${encodeURIComponent(item.name || 'accessories')}`
    },
    default: {
      name: "Flipkart",
      color: "from-blue-600 to-indigo-600",
      bgGlow: "group-hover:border-blue-500/40",
      textColor: "text-blue-400",
      url: `https://www.flipkart.com/search?q=${encodeURIComponent(item.name || 'store')}`
    }
  };

  // Determine current active provider context based on category fields
  const categoryKey = item.category?.toLowerCase();
  const config = platformConfig[categoryKey] || platformConfig.default;

  return (
    <div className={`group relative flex flex-col justify-between bg-[#111115] border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full shadow-lg ${config.bgGlow}`}>
      
      {/* Top Image Workspace Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#16161a] overflow-hidden flex items-center justify-center border-b border-zinc-900/80">
        
        {/* Dynamic Partner Badge Overlay */}
        <span className={`absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r shadow-md ${config.color}`}>
          {config.name}
        </span>

        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="object-cover w-full h-full object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x800/16161a/3f3f46?text=VibeCheck+Style';
            }}
          />
        ) : (
          <div className="text-zinc-600 text-xs font-mono">Image Asset Offline</div>
        )}
      </div>

      {/* Typography and Actions Wrapper Layer */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <span className={`text-[10px] font-bold tracking-widest uppercase font-mono ${config.textColor}`}>
            ✦ {item.category || "General"}
          </span>
          <h4 className="text-sm font-bold text-zinc-100 tracking-tight mt-0.5 line-clamp-1 group-hover:text-white transition-colors">
            {item.name || "Premium Aesthetic Uniform"}
          </h4>
        </div>

        {/* Operational Redirection Engine CTA */}
        <a 
          href={config.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center block text-[11px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 py-2.5 rounded-xl transition-all duration-200"
        >
          Buy via {config.name} ↗
        </a>
      </div>
    </div>
  );
}