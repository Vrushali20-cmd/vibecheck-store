import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar           from './components/Navbar';
import GuestDashboard   from './components/GuestDashboard';
import UserDashboard    from './components/userDashboard';
import AuthScreen       from './components/AuthScreen';
import AIStylistDrawer  from './components/AIStylistDrawer';
import ProductDashboard from './components/products/ProductDashboard';
import StyleBooth       from './components/StyleBooth';
import Cart             from './components/Cart';
import Checkout         from './components/Checkout';
import OrderSuccess     from './components/OrderSuccess';
import OrderHistory     from './components/OrderHistory';
import ProductDetail    from './components/ProductDetail';

import { useCart } from './hooks/useCart';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen,   setAuthModalOpen]   = useState(false);
  const [chatOpen,        setChatOpen]        = useState(false);
  const [cartOpen,        setCartOpen]        = useState(false);

  const {
    cart, loading: cartLoading, subtotal,
    itemCount, addToCart, updateQuantity,
    removeFromCart, fetchCart,
  } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('vibe_token');
    if (isAuthenticated && token) fetchCart();
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('vibe_token');
    setIsAuthenticated(false);
    setChatOpen(false);
    setCartOpen(false);
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
            onCartClick={() => setCartOpen(true)}
            cartItemCount={itemCount}
          />

          <main className="relative min-h-screen pb-24">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated
                    ? <Navigate to="/dashboard" />
                    : <GuestDashboard setAuthModalOpen={setAuthModalOpen} />
                }
              />

              <Route
                path="/dashboard"
                element={
                  isAuthenticated
                    ? <UserDashboard
                        setChatOpen={setChatOpen}
                        onAddToCart={addToCart}
                        onCartOpen={() => setCartOpen(true)}
                      />
                    : <Navigate to="/" />
                }
              />

              <Route path="/shop" element={<ProductDashboard />} />

              <Route
                path="/style-booth"
                element={
                  <StyleBooth
                    isAuthenticated={isAuthenticated}
                    onLoginPrompt={() => setAuthModalOpen(true)}
                  />
                }
              />

              {/* Product detail page */}
              <Route
                path="/product/:id"
                element={
                  isAuthenticated
                    ? <ProductDetail
                        onAddToCart={addToCart}
                        onCartOpen={() => setCartOpen(true)}
                      />
                    : <Navigate to="/" />
                }
              />

              <Route
                path="/checkout"
                element={
                  isAuthenticated
                    ? <Checkout cart={cart} />
                    : <Navigate to="/" />
                }
              />

              <Route
                path="/order-success"
                element={
                  isAuthenticated
                    ? <OrderSuccess />
                    : <Navigate to="/" />
                }
              />

              <Route
                path="/orders"
                element={
                  isAuthenticated
                    ? <OrderHistory />
                    : <Navigate to="/" />
                }
              />
            </Routes>
          </main>

          <Cart
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            loading={cartLoading}
            subtotal={subtotal}
            onUpdateQty={updateQuantity}
            onRemove={removeFromCart}
          />

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