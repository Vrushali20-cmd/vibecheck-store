import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar            from './components/Navbar';
import GuestDashboard   from './components/GuestDashboard';
import UserDashboard     from './components/userDashboard';
import AuthScreen        from './components/AuthScreen';
import AIStylistDrawer   from './components/AIStylistDrawer';
import ProductDashboard  from './components/products/ProductDashboard';
import StyleBooth        from './components/StyleBooth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen,   setAuthModalOpen]   = useState(false);
  const [chatOpen,        setChatOpen]        = useState(false);

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
    window.location.href = '/';
  };

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#fff9fa] text-zinc-800 antialiased selection:bg-pink-300">
          <Navbar
            isAuthenticated={isAuthenticated}
            onLoginClick={() => setAuthModalOpen(true)}
            onLogout={handleLogout}
          />

          <main className="relative min-h-screen pb-24">
            <Routes>
              {/* Public storefront */}
              <Route
                path="/"
                element={
                  isAuthenticated
                    ? <Navigate to="/dashboard" />
                    : <GuestDashboard setAuthModalOpen={setAuthModalOpen} />
                }
              />

              {/* Protected dashboard */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated
                    ? <UserDashboard setChatOpen={setChatOpen} />
                    : <Navigate to="/" />
                }
              />

              {/* Product shop */}
              <Route path="/shop" element={<ProductDashboard />} />

              {/* Style Booth — accessible to everyone.
                  Guests see the full flow but get a login wall on Save/Add to Cart. */}
              <Route
                path="/style-booth"
                element={
                  <StyleBooth
                    isAuthenticated={isAuthenticated}
                    onLoginPrompt={() => setAuthModalOpen(true)}
                  />
                }
              />
            </Routes>
          </main>

          <AuthScreen
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onAuthSuccess={handleAuthSuccess}
          />

          <AIStylistDrawer
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}