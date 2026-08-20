import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CanCanvas } from '../3d/CanCanvas';
import { MagneticButton } from '../ui/MagneticButton';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

export const FinalCTA: React.FC = () => {
  const finalProduct = PRODUCTS[1]; // AEROVA PULSE
  const { openCart } = useCart();
  const { playClick } = useSound();

  const handleShopNow = () => {
    playClick();
    openCart();
  };

  const handleExploreLab = () => {
    playClick();
    const el = document.getElementById('product-spotlight');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] py-28 sm:py-36 bg-gradient-to-b from-[#080414] via-[#120524] to-[#05020A] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Cosmic Aura & Background Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-purple-600/25 blur-[160px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF3366]/20 blur-[130px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center">
        {/* Floating 3D Rising Can */}
        <div className="relative w-72 sm:w-80 h-72 sm:h-80 -mb-6 sm:-mb-8 pointer-events-none">
          <CanCanvas
            product={finalProduct}
            enableMouseFollow={true}
            interactiveDrag={false}
            autoRotate={true}
            scale={1.05}
            showParticles={true}
            className="w-full h-full"
          />
        </div>

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-pink-300 mb-6 border-pink-500/30">
          <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>ZERO GRAVITY DISPATCH 2026</span>
        </div>

        {/* Massive Headline */}
        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-white uppercase select-none mb-6">
          <span className="block text-white/50">READY TO</span>
          <span className="block gradient-text-rainbow">DEFY GRAVITY?</span>
        </h2>

        {/* Subtitle */}
        <p className="font-display text-base sm:text-xl text-white/70 max-w-xl mx-auto mb-10 font-light">
          Unlock sub-orbital mental clarity and effortless physical momentum. Free Express Delivery on orders over $50.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <MagneticButton
            size="lg"
            variant="lime"
            onClick={handleShopNow}
            icon={<ShoppingBag className="w-5 h-5 text-[#080414]" />}
            cursorLabel="SHOP"
          >
            <span>SHOP AEROVA</span>
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="secondary"
            onClick={handleExploreLab}
            icon={<ArrowRight className="w-5 h-5" />}
            cursorLabel="LAB"
          >
            <span>EXPLORE 3D LAB</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
