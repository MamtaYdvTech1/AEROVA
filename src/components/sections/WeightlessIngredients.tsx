import React, { useState } from 'react';
import { Sparkles, Info, X, Compass } from 'lucide-react';
import { INGREDIENTS } from '../../data/ingredients';
import { Ingredient } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { CanCanvas } from '../3d/CanCanvas';
import { useSound } from '../../context/SoundContext';

export const WeightlessIngredients: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(INGREDIENTS[0]);
  const centerProduct = PRODUCTS[2]; // AEROVA LIME
  const { playHover, playClick } = useSound();

  const handleSelect = (ing: Ingredient) => {
    playClick();
    setActiveIngredient(ing);
  };

  return (
    <section id="ingredients" className="relative min-h-screen py-24 sm:py-32 bg-[#080414] overflow-hidden">
      {/* Background Zero-G Dust & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-600/10 blur-[170px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono text-emerald-300 mb-3 border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>BIO-ACTIVE FORMULATION ENGINE</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            WHAT&rsquo;S INSIDE?
          </h2>
          <p className="text-sm sm:text-base font-display text-white/60 mt-3 max-w-xl mx-auto">
            Hover and inspect the weightless botanical and adaptogenic compounds floating within our zero-gravity matrix.
          </p>
        </div>

        {/* Central Interactive Weightless Field (Desktop / Tablet) */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl glass-panel border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Center 3D Can Anchor */}
          <div className="relative w-72 sm:w-96 h-80 sm:h-[480px] z-10 pointer-events-none">
            <CanCanvas
              product={centerProduct}
              enableMouseFollow={true}
              interactiveDrag={false}
              autoRotate={true}
              scale={0.95}
              showParticles={false}
              className="w-full h-full"
            />
          </div>

          {/* Floating Weightless Ingredient Nodes */}
          {INGREDIENTS.map((ing, idx) => {
            const isSelected = activeIngredient?.id === ing.id;
            return (
              <div
                key={ing.id}
                style={{
                  top: `${ing.pos.y}%`,
                  left: `${ing.pos.x}%`,
                  animationDelay: `-${ing.pos.floatDelay}s`,
                }}
                className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 animate-zero-g cursor-pointer transition-transform duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                onClick={() => handleSelect(ing)}
                onMouseEnter={playHover}
                data-cursor="INSPECT"
              >
                {/* Floating Node Disc */}
                <div
                  className="relative p-3.5 sm:p-4 rounded-2xl glass-panel flex items-center gap-2.5 shadow-2xl transition-all duration-300"
                  style={{
                    boxShadow: isSelected ? `0 0 35px ${ing.glow}` : '0 8px 32px rgba(0,0,0,0.5)',
                    borderColor: isSelected ? ing.color : 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <span className="text-2xl sm:text-3xl">{ing.icon}</span>
                  <div className="hidden sm:block text-left">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 block">
                      {ing.category}
                    </span>
                    <span className="text-xs font-display font-bold text-white block">
                      {ing.name}
                    </span>
                  </div>

                  {/* Pulsing ring */}
                  <div
                    className="absolute -inset-1 rounded-2xl border animate-ping pointer-events-none opacity-40"
                    style={{ borderColor: ing.color, animationDuration: '4s' }}
                  />
                </div>
              </div>
            );
          })}

          {/* Active Ingredient Floating Info Card (Bottom-Center Overlay) */}
          {activeIngredient && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 p-5 rounded-2xl bg-[#0F0824]/95 backdrop-blur-xl border border-purple-500/40 shadow-2xl animate-slideUp">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{activeIngredient.icon}</span>
                  <div>
                    <h4 className="font-display font-black text-base text-white">
                      {activeIngredient.name}
                    </h4>
                    <span className="text-[11px] font-mono text-purple-300/70 italic block">
                      {activeIngredient.scientificName}
                    </span>
                  </div>
                </div>

                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase"
                  style={{ backgroundColor: `${activeIngredient.color}25`, color: activeIngredient.color }}
                >
                  {activeIngredient.category}
                </span>
              </div>

              <p className="text-xs text-white/70 mt-2 font-display leading-relaxed">
                {activeIngredient.benefit}
              </p>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-purple-400" /> Origin: {activeIngredient.origin}
                </span>
                <span className="text-[#CCFF00] font-bold">100% BIO-ABSORBABLE</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Horizontal Ingredient Cards List */}
        <div className="mt-6 sm:hidden grid grid-cols-1 gap-3">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              onClick={() => handleSelect(ing)}
              className="p-4 rounded-2xl glass-panel flex items-start gap-3 border border-white/10"
            >
              <span className="text-2xl">{ing.icon}</span>
              <div>
                <h5 className="font-bold text-xs text-white">{ing.name}</h5>
                <p className="text-[11px] text-white/60 mt-0.5">{ing.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
