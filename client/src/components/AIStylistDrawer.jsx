import React, { useState, useRef, useEffect } from 'react';
import API from '../api/axiosConfig';

const API_BASE = 'http://localhost:5000';

const ProductPill = ({ product }) => {
  const imgSrc = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `${API_BASE}${product.imageUrl}`;

  return (
    <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-2xl p-3">
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-700">
        <img src={imgSrc} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-200 truncate">{product.name}</p>
        <p className="text-[10px] text-purple-400 font-bold mt-0.5">₹{product.price}</p>
      </div>
    </div>
  );
};

export default function AIStylistDrawer({ isOpen, onClose }) {
  const [messages,     setMessages]     = useState([
    { role: 'assistant', text: "✨ Describe the exact vibe, event, or aesthetic you want to manifest, and I'll find the perfect looks from our catalog." }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading,      setLoading]      = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');
    setLoading(true);

    try {
      const token    = localStorage.getItem('vibe_token');
      const response = await API.post(
        '/ai/stylist-chat',
        { message: userText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { reply, products } = response.data;

      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: reply },
        ...(products?.length > 0
          ? [{ role: 'products', items: products }]
          : [])
      ]);
    } catch (error) {
      console.error('Chat error:', error.response?.data || error.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '🚨 Something went wrong. Make sure you are signed in and try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-end z-50">
      <div className="w-full max-w-md bg-[#0b0f19] border-l border-slate-900 h-full flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/20">
          <div>
            <h3 className="font-black text-xs tracking-[0.2em] text-purple-400 uppercase">Wardrobe Copilot</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Gemini 2.5 · Real-Time Styling</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl border border-slate-800 text-slate-400 text-sm hover:text-white transition-colors"
          >✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((msg, idx) => {
            if (msg.role === 'products') {
              return (
                <div key={idx} className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Matched Looks</p>
                  {msg.items.map((p, i) => <ProductPill key={i} product={p} />)}
                </div>
              );
            }
            return (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] font-bold text-slate-500 mb-1.5 tracking-widest uppercase">
                  {msg.role === 'user' ? 'You' : 'Gemini Stylist'}
                </span>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 animate-pulse">
                Parsing aesthetic vectors…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-900 bg-slate-950/40 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="e.g. something elegant for a wedding…"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50 placeholder-slate-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}