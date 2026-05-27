import React, { useState } from 'react';
import API from '../api/axiosConfig';

export default function AuthScreen({ isOpen, onClose, onAuthSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const endpoint = isRegisterMode ? '/auth/register' : '/auth/login';
    const payload = isRegisterMode ? { name, email, password } : { email, password };

    try {
      const response = await API.post(endpoint, payload);
      if (response.data.token) {
        localStorage.setItem('vibe_token', response.data.token);
        onAuthSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication pipeline failure.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0e1422]/90 border border-slate-900 rounded-3xl p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 h-8 w-8 rounded-xl border border-slate-900 text-slate-400 text-sm hover:text-white flex items-center justify-center"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h1 className="text-xl font-black tracking-[0.25em] bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent mb-2">
            VIBECHECK
          </h1>
          <p className="text-xs text-slate-400">
            {isRegisterMode ? "Create your personalized account" : "Sign in to connect your AI stylist"}
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2.5 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anjali Sharma" 
                required
                className="w-full bg-[#060a15] border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anjali@example.com" 
              required
              className="w-full bg-[#060a15] border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full bg-[#060a15] border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-xs tracking-wider uppercase text-white shadow-lg transition"
          >
            {isRegisterMode ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsRegisterMode(!isRegisterMode); setError(""); }}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium transition"
          >
            {isRegisterMode ? "Already have an account? Sign In" : "New to VibeCheck? Create new account"}
          </button>
        </div>
      </div>
    </div>
  );
}