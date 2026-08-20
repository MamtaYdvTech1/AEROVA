import React, { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import { CartProvider } from './context/CartContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { GravityStatusHUD } from './components/ui/GravityStatusHUD';
import { SearchModal } from './components/ui/SearchModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Experience Sections
import { Hero } from './components/sections/Hero';
import { KineticMarquee } from './components/sections/KineticMarquee';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { ColorTransformation } from './components/sections/ColorTransformation';
import { ProductSpotlight } from './components/sections/ProductSpotlight';
import { WeightlessIngredients } from './components/sections/WeightlessIngredients';
import { BrandStory } from './components/sections/BrandStory';
import { FinalCTA } from './components/sections/FinalCTA';

export const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('aerova-zero');

  const handleSelectProductForViewer = (id: string) => {
    setSelectedProductId(id);
    const elem = document.getElementById('product-spotlight');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080414] text-[#FAF5FF] overflow-x-hidden selection:bg-[#A855F7] selection:text-white">
      {/* Film Grain Subtle Overlay */}
      <div className="grain-overlay" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Preloader Experience */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Floating Navigation Header */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Kinetic Text & Marquee */}
        <KineticMarquee />

        {/* 3. Horizontal Product Showcase */}
        <ProductShowcase onSelectProductForViewer={handleSelectProductForViewer} />

        {/* 4. Dynamic Color Transformation Section */}
        <ColorTransformation onSelectProductForViewer={handleSelectProductForViewer} />

        {/* 5. Product Spotlight & 3D Interactive Viewer */}
        <ProductSpotlight
          selectedProductId={selectedProductId}
          onSelectProduct={(id) => setSelectedProductId(id)}
        />

        {/* 6. Weightless Ingredients Section */}
        <WeightlessIngredients />

        {/* 7. Brand Story & Editorial Manifesto */}
        <BrandStory />

        {/* 8. Final CTA Section */}
        <FinalCTA />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Telemetry & Audio HUD */}
      <GravityStatusHUD />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Interactive Checkout Modal */}
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <SoundProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </SoundProvider>
  );
}
