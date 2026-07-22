import React from 'react';

export default function AIGeneratedCard({ item, onPurchaseInit }) {
  return (
    <div className="group bg-[#0f0a16] border border-pink-500/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-pink-500/40 flex flex-col justify-between h-full shadow-xl shadow-purple-950/10">
      
      {/* Exclusive Asset Viewport */}
      <div className="relative aspect-[3/4] bg-[#140e20] overflow-hidden flex items-center justify-center border-b border-pink-950/20">
        <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase bg-pink-600 text-white font-mono shadow-md">
          AI Minted
        </span>
        <img 
          src={item.imageUrl || 'https://placehold.co/600x800/140e20/3f3f46?text=Generation+In+Progress'} 
          alt={item.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      {/* Proprietary Product Data Framework */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-black tracking-widest uppercase font-mono text-pink-400 bg-pink-500/5 px-2 py-0.5 rounded border border-pink-500/10">
              ✦ {item.tag || "Exclusive Line"}
            </span>
            <span className="text-[9px] font-mono text-zinc-500">ID: {item._id?.slice(-6) || "Gen-X"}</span>
          </div>
          <h4 className="text-sm font-bold text-zinc-100 tracking-tight mt-2 line-clamp-1 group-hover:text-pink-300 transition-colors">
            {item.name || "Bespoke Design Model"}
          </h4>
          <p className="text-[11px] text-zinc-400/70 mt-1 line-clamp-2 leading-relaxed">
            {item.description || "Custom weight procedural asset generated explicitly for your structural taste profile."}
          </p>
        </div>

        {/* Dynamic Pricing Layout */}
        <div className="flex items-center justify-between border-t border-pink-950/30 pt-3">
          <div className="font-mono">
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Suite Price</span>
            <span className="text-sm font-black text-white">₹{item.price || 2499}</span>
          </div>
          <button 
            onClick={() => onPurchaseInit(item)}
            className="px-4 py-2 text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-500 hover:to-fuchsia-500 text-white rounded-xl transition-all duration-200 shadow-md shadow-pink-950/50"
          >
            Acquire Piece
          </button>
        </div>
      </div>
    </div>
  );
}
