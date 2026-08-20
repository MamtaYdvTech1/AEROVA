import React from 'react';
import { Sparkles, Compass, Shield, Zap, Globe } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CanCanvas } from '../3d/CanCanvas';

export const BrandStory: React.FC = () => {
  const storyProduct = PRODUCTS[3]; // AEROVA NIGHT

  return (
    <section id="story" className="relative py-24 sm:py-36 bg-[#06020E] overflow-hidden border-t border-purple-500/15">
      {/* Background Architectural Beams & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-indigo-950/30 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Narrative Statement */}
        <div className="max-w-4xl space-y-6 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>THE ZERO-GRAVITY MANIFESTO</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white uppercase select-none">
            <span className="block text-white/50">WE DIDN&rsquo;T CREATE</span>
            <span className="block text-white">ANOTHER DRINK.</span>
            <span className="block text-white/50 mt-4">WE CREATED</span>
            <span className="block gradient-text-purple">A NEW FEELING.</span>
          </h2>

          <p className="font-display text-lg sm:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
            Born from the intersection of aerospace formulation and cryogenic botanicals, AEROVA was engineered to eradicate gravitational fatigue and unlock pure, weightless human potential.
          </p>
        </div>

        {/* 3-Column Editorial Grid with 3D Can Floating in Center */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Principles */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-xl text-white">
                Zero Sugar, Zero Weight
              </h3>
              <p className="text-xs font-mono text-white/60 leading-relaxed">
                Sugars drag metabolic energy downward. We use 100% monk fruit bio-extracts and marine minerals to create crisp hydration without glycemic burden.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-xl text-white">
                Alpha Brainwave Modulation
              </h3>
              <p className="text-xs font-mono text-white/60 leading-relaxed">
                Formulated with clinically-studied Suntheanine® L-Theanine to smooth caffeine absorption, locking the mind in effortless zero-gravity flow.
              </p>
            </div>
          </div>

          {/* Center Column: Floating 3D Midnight Can */}
          <div className="md:col-span-4 relative h-[380px] sm:h-[480px] flex items-center justify-center">
            <div className="absolute w-56 h-56 rounded-full bg-purple-600/20 blur-[90px] pointer-events-none" />
            <CanCanvas
              product={storyProduct}
              enableMouseFollow={true}
              interactiveDrag={false}
              autoRotate={true}
              scale={1.0}
              showParticles={true}
              className="w-full h-full"
            />
          </div>

          {/* Right Column: Standards */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-600/30 border border-pink-400/40 flex items-center justify-center text-pink-300">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-xl text-white">
                Cryogenic Extraction
              </h3>
              <p className="text-xs font-mono text-white/60 leading-relaxed">
                Cold-pressed below freezing to preserve volatile citrus terpenes, whole adaptogens, and antioxidant polyphenols in their purest energetic state.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-xl text-white">
                Infinitely Circular
              </h3>
              <p className="text-xs font-mono text-white/60 leading-relaxed">
                Ultra-light aluminum vessels engineered with 90% recycled aerospace metal and zero synthetic plastic films.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
