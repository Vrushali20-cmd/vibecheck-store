import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PublicStorefront from './components/PublicStorefront';
import UserDashboard from './components/UserDashboard';
import AuthScreen from './components/AuthScreen';
import AIStylistDrawer from './components/AIStylistDrawer';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('vibe_token');
    setIsAuthenticated(false);
    setChatOpen(false);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#fff9fa] text-zinc-800 antialiased selection:bg-pink-300">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLoginClick={() => setAuthModalOpen(true)} 
          onLogout={handleLogout} 
        />
        
        <main className="relative min-h-screen pb-24">
          {isAuthenticated ? (
            <UserDashboard setChatOpen={setChatOpen} />
          ) : (
            <PublicStorefront setAuthModalOpen={setAuthModalOpen} />
          )}
        </main>

        <AuthScreen 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          onAuthSuccess={handleAuthSuccess} 
        />
        
        <AIStylistDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </AuthProvider>
  );
}