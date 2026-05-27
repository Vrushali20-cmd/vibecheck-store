import React, { useState } from 'react';
import API from '../api/axiosConfig';

export default function AIStylistDrawer({ isOpen, onClose, onProductsUpdated }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "✨ Describe the exact vibe, event, or aesthetic you want to manifest tonight, and I will filter our catalog instantly." }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage("");
    setLoading(true);

    try {
      // Pull token dynamically from local storage
      const token = localStorage.getItem('vibe_token');

      // Inject authorization intercept headers into your Axios request
      const response = await API.post('/ai/stylist-chat', 
        { message: userText },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const { reply, products: matchedProducts } = response.data;
      
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      if (matchedProducts && matchedProducts.length > 0) {
        onProductsUpdated(matchedProducts);
      }
    } catch (error) {
      console.error("Chat styling execution failed:", error.response?.data || error.message);
      setMessages(prev => [...prev, { role: 'assistant', text: "🚨 Pipeline connectivity lost. Make sure you are signed in." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex justify-end z-50">
      <div className="w-full max-w-md bg-[#0b0f19] border-l border-slate-900 h-full flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/20">
          <div>
            <h3 className="font-black text-xs tracking-[0.2em] text-purple-400 uppercase">WARDROBE COPILOT</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Gemini 2.5 Real-Time Pipeline</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-xl border border-slate-900 text-slate-400 text-sm hover:text-white">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] font-bold text-slate-500 mb-1.5 tracking-widest uppercase">{msg.role === 'user' ? 'You' : 'Gemini Agent'}</span>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-tr-none' : 'bg-slate-900/60 border border-slate-900 text-slate-300 rounded-tl-none'}`}>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="animate-pulse text-slate-500 text-xs">Parsing aesthetic vectors...</div>
          )}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-slate-900 bg-slate-950/40 flex gap-2">
          <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask for an evening wear gown or minimal look..." className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50" />
          <button type="submit" className="bg-purple-600 text-white px-5 rounded-xl text-xs font-bold uppercase tracking-wider">Send</button>
        </form>
      </div>
    </div>
  );
}