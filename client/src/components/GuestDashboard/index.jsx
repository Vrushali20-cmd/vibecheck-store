import { useProducts } from '../../hooks/useProducts';
import { DARK_THEME, STATIC_STYLES } from './constants';

import GuestHero         from './components/GuestHero';
import StyleBoothBanner  from './components/StyleBoothBanner';
import FeaturedProducts  from './components/FeaturedProducts';
import Testimonials      from './components/Testimonials';
import LoginNudge        from './components/LoginNudge';

export default function GuestDashboard({ setAuthModalOpen }) {
  // Fetch featured products — null triggers a global fetch in useProducts
  const { products, loading } = useProducts('Dresses');

  return (
    <div style={DARK_THEME} className="min-h-screen gd-body">
      <style>{STATIC_STYLES}</style>

      {/* 1. Hero — brand statement + primary CTAs */}
      <GuestHero onLoginClick={() => setAuthModalOpen(true)} />

      {/* 2. Style Booth — the feature highlight */}
      <StyleBoothBanner />

      {/* 3. Featured products — max 8, with login-to-save hover */}
      <FeaturedProducts
        products={products}
        loading={loading}
        onLoginClick={() => setAuthModalOpen(true)}
      />

      {/* 4. Testimonials — social proof */}
      <Testimonials />

      {/* 5. Sticky bottom signup nudge */}
      <LoginNudge onLoginClick={() => setAuthModalOpen(true)} />

      {/* Bottom padding so LoginNudge doesn't cover last content */}
      <div className="h-20" />
    </div>
  );
}