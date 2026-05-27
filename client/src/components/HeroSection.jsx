import React from 'react';

export default function HeroSection({ onOpenChat }) {
  const stats = [
    { label: "Sync Latency", value: "120ms", desc: "MongoDB Cluster" },
    { label: "Core AI Engine", value: "Gemini 2.5", desc: "Structured Mime" },
    { label: "User Aesthetic", value: "Minimalist", desc: "Vector Scored" },
    { label: "Active Pipeline", value: "Healthy", desc: "No Middleware Drops" }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-16">
      <div className="relative rounded-3xl overflow-hidden border border-slate-900 bg-gradient-to-b from-slate-900/40 to-slate-950/20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            ⚡ Live Generative Agent Integrated
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            E-Commerce, Match <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Your Exact Vibe.
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Don't manually browse thousands of cold catalog lists. Click our retail AI copilot drawer below, speak your mind, and watch the entire architecture reorganize dynamically.
          </p>
          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
            <button onClick={onOpenChat} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-xs font-bold tracking-wider uppercase text-white shadow-xl hover:scale-[1.02] transition duration-200">
              Launch Stylist Copilot
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-900/80 p-5 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{stat.label}</p>
              <p className="text-xl font-extrabold text-white mt-1">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}