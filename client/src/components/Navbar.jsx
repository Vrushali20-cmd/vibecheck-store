import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ isAuthenticated, onLoginClick, onLogout }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0f1d]/70 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <h1 className="text-lg font-black tracking-[0.25em] bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            VIBECHECK
          </h1>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-bold text-slate-200">{user?.name || "User"}</span>
              <span className="text-[10px] text-purple-400 tracking-wide font-medium">{user?.aesthetic || "Minimalist"}</span>
            </div>
            <button 
              onClick={onLogout}
              className="text-xs bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-purple-950/30"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}