import React, { useState } from 'react';
import { Sparkles, ArrowRight, Activity, Gauge, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { CanCanvas } from '../3d/CanCanvas';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

interface ColorTransformationProps {
  onSelectProductForViewer: (productId: string) => void;
}

export const ColorTransformation: React.FC<ColorTransformationProps> = ({
  onSelectProductForViewer,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeProduct = PRODUCTS[activeIdx];
  const { addToCart } = useCart();
  const { playClick, playHover } = useSound();

  const themes = [
    {
      id: 'violet',
      name: 'VIOLET OBSIDIAN',
      color: '#A855F7',
      bgGrad: 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.28) 0%, rgba(8, 4, 20, 0.98) 75%)',
      glow: '#8A2BE2',
      tag: '0G COGNITIVE FLOW',
    },
    {
      id: 'pink',
      name: 'PULSE CORAL',
      color: '#FF3366',
      bgGrad: 'radial-gradient(circle at 50% 50%, rgba(255, 51, 102, 0.28) 0%, rgba(20, 4, 10, 0.98) 75%)',
      glow: '#FF3366',
      tag: 'METABOLIC ACCELERATION',
    },
    {
      id: 'lime',
      name: 'NEON LIME',
      color: '#CCFF00',
      bgGrad: 'radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.22) 0%, rgba(10, 18, 3, 0.98) 75%)',
      glow: '#CCFF00',
      tag: 'SUB-ALPINE PURITY',
    },
    {
      id: 'night',
      name: 'MIDNIGHT AMETHYST',
      color: '#C084FC',
      bgGrad: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.25) 0%, rgba(10, 5, 22, 0.98) 75%)',
      glow: '#9333EA',
      tag: 'ADAPTOGENIC TRANQUILITY',
    },
  ];

  const currentTheme = themes[activeIdx];

  const handleSelectTheme = (idx: number) => {
    playClick();
    setActiveIdx(idx);
  };

  return (
    <section
      id="color-transformation"
      className="relative min-h-screen py-24 sm:py-32 flex flex-col justify-center overflow-hidden transition-all duration-1000 ease-in-out"
      style={{ background: currentTheme.bgGrad }}
    >
      {/* Ambient Moving Particles / Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[150px] transition-colors duration-1000" style={{ backgroundColor: currentTheme.glow }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Section Header with Dynamic Category Tag */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono tracking-widest uppercase mb-4 transition-all duration-700"
            style={{ borderColor: `${currentTheme.color}50`, color: currentTheme.color }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentTheme.tag}</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase select-none">
            <span className="block transform transition-transform duration-700">ONE BRAND.</span>
            <span
              className="block transition-colors duration-700"
              style={{ color: currentTheme.color }}
            >
              INFINITE ENERGY.
            </span>
          </h2>
        </div>

        {/* Dynamic Interactive Flavor Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => handleSelectTheme(idx)}
              onMouseEnter={playHover}
              className={`px-4 sm:px-6 py-3 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'glass-panel text-white/60 hover:text-white hover:bg-white/10'
              }`}
              data-cursor="SWITCH"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: prod.accentColor }}
              />
              <span>{prod.name.replace('AEROVA ', '')}</span>
            </button>
          ))}
        </div>

        {/* Central Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
          {/* Left: 3D Animated Can View */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[460px] flex items-center justify-center">
            <div
              className="absolute w-56 h-56 rounded-full blur-[80px] opacity-60 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: activeProduct.themeColor }}
            />
            <CanCanvas
              key={activeProduct.id}
              product={activeProduct}
              enableMouseFollow={true}
              interactiveDrag={false}
              autoRotate={true}
              scale={1.05}
              showParticles={true}
              className="w-full h-full"
            />
          </div>

          {/* Right: Flavor Stats & Bio-Kinetics */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                FORMULATION MATRIX
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                {activeProduct.name}
              </h3>
              <p className="text-sm sm:text-base font-display text-white/70 mt-2 leading-relaxed">
                {activeProduct.heroLine}
              </p>
            </div>

            {/* Scientific Telemetry Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono">
                  <Activity className="w-3 h-3 text-purple-400" />
                  <span>CAFFEINE</span>
                </div>
                <span className="font-mono font-bold text-sm sm:text-base text-white block">
                  {activeProduct.nutrition.caffeine}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono">
                  <Gauge className="w-3 h-3 text-[#CCFF00]" />
                  <span>SUNTHEANINE</span>
                </div>
                <span className="font-mono font-bold text-sm sm:text-base text-white block">
                  {activeProduct.nutrition.lTheanine}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono">
                  <Flame className="w-3 h-3 text-pink-400" />
                  <span>CALORIES</span>
                </div>
                <span className="font-mono font-bold text-sm sm:text-base text-white block">
                  {activeProduct.nutrition.calories} kcal
                </span>
              </div>
            </div>

            {/* Key Functional Benefits */}
            <ul className="space-y-2">
              {activeProduct.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 text-xs text-white/80 font-mono">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: activeProduct.accentColor }}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => addToCart(activeProduct, 12, 1)}
                className="py-3.5 px-6 rounded-2xl text-black font-display font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
                style={{ backgroundColor: activeProduct.accentColor }}
              >
                Add 12-Pack to Vault • ${activeProduct.packOptions[1].price}
              </button>

              <button
                onClick={() => onSelectProductForViewer(activeProduct.id)}
                className="py-3.5 px-5 rounded-2xl glass-pill hover:bg-white/15 text-white font-display font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Full 3D Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
