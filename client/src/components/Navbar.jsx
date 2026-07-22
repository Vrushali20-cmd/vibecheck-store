import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ isAuthenticated, onLoginClick, onLogout, onCartClick, cartItemCount = 0 }) {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0f1d]/70 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-pulse" />
          <h1 className="text-lg font-black tracking-[0.25em] bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            VIBECHECK
          </h1>
        </Link>

        {/* Nav links — centre */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/style-booth"
            className="text-xs font-bold text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-1.5"
          >
            ✨ Style Booth
          </Link>
          {isAuthenticated && (
            <Link
              to="/orders"
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              My Orders
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">

          {/* Cart button — only for logged in users */}
          {isAuthenticated && (
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
              aria-label={`Cart, ${cartItemCount} items`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                className="w-4 h-4 text-slate-300">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-bold bg-pink-500 text-white flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-200">{user?.name || 'User'}</span>
                <span className="text-[10px] text-purple-400 tracking-wide font-medium">
                  {user?.aesthetic || 'Minimalist'}
                </span>
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

      </div>
    </header>
  );
}
