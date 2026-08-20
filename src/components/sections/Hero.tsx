import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CanCanvas } from '../3d/CanCanvas';
import { MagneticButton } from '../ui/MagneticButton';
import { useSound } from '../../context/SoundContext';

export const Hero: React.FC = () => {
  const heroProduct = PRODUCTS[0]; // AEROVA ZERO
  const [scrollY, setScrollY] = useState<number>(0);
  const { playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Background Architectural Panels & Radial Light Beams */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Violet / Electric Purple Radial Glow behind Can */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-purple-600/20 blur-[150px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[120px]" />

        {/* Vertical Architectural Light Columns (Reference 1) */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 grid grid-cols-6 sm:grid-cols-12 pointer-events-none opacity-30">
          <div className="architectural-beam col-span-1" />
          <div className="col-span-2 hidden sm:block" />
          <div className="architectural-beam col-span-1 hidden sm:block" />
          <div className="col-span-4" />
          <div className="architectural-beam col-span-1" />
          <div className="col-span-2 hidden sm:block" />
          <div className="architectural-beam col-span-1" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* LEFT: Massive Editorial Typography & CTAs */}
          <div className="lg:col-span-7 z-20 space-y-6 sm:space-y-8 text-left">
            {/* Top Formulation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs font-mono text-purple-200 border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span className="tracking-widest uppercase font-bold text-white">FORMULA V4.8 ZERO-G</span>
              <span className="text-white/30">|</span>
              <span className="text-purple-300">355ML OBSIDIAN</span>
            </div>

            {/* Huge Kinetic Typography */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-[92px] tracking-tight leading-[0.9] text-white uppercase select-none">
              <span className="block transform transition-transform duration-700 hover:translate-x-2">
                TASTE
              </span>
              <span className="block gradient-text-purple transform transition-transform duration-700 hover:translate-x-3">
                BEYOND
              </span>
              <span className="block text-stroke-title hover:text-white transition-all duration-500">
                GRAVITY.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="font-display text-lg sm:text-2xl text-purple-100/90 font-light max-w-xl leading-snug">
              A new generation of flavor, engineered to move differently. Pure botanical energy and marine electrolytes without weight.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-mono text-white/80">
              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>0 SUGAR • 0 CALORIES</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>150MG CLEAN CAFFEINE</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>200MG SUNTHEANINE®</span>
              </div>
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection('product-showcase')}
                icon={<ArrowRight className="w-5 h-5" />}
                cursorLabel="EXPLORE"
              >
                <span>EXPLORE THE FLAVOR</span>
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection('story')}
                cursorLabel="MEET"
              >
                <span>MEET AEROVA</span>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT / CENTER: Floating 3D Zero-G Can */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[560px] lg:min-h-[640px]">
            {/* Animated Orbit Rings */}
            <div className="absolute w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border border-purple-500/20 animate-orbit pointer-events-none" />
            <div className="absolute w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full border border-dashed border-[#CCFF00]/15 pointer-events-none" />

            {/* 3D WebGL Can Canvas */}
            <div className="relative w-full h-[460px] sm:h-[580px] lg:h-[650px] z-10">
              <CanCanvas
                product={heroProduct}
                enableMouseFollow={true}
                interactiveDrag={false}
                autoRotate={true}
                scale={1.12}
                showParticles={true}
                className="w-full h-full"
                onCanClick={() => scrollToSection('product-spotlight')}
              />
            </div>

            {/* Floating Info Tag 1 */}
            <div className="absolute top-12 -left-4 sm:left-2 z-20 px-3.5 py-2 rounded-2xl glass-panel text-[11px] font-mono text-white/90 shadow-xl hidden sm:flex items-center gap-2 animate-zero-g">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>PRESSURE: 1 ATM (BALANCED)</span>
            </div>

            {/* Floating Info Tag 2 */}
            <div className="absolute bottom-16 -right-2 sm:right-4 z-20 px-3.5 py-2 rounded-2xl glass-panel text-[11px] font-mono text-white/90 shadow-xl hidden sm:flex items-center gap-2 animate-zero-g-delayed">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
              <span>LEVITATION: 100% NOMINAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex items-center justify-between pt-6 text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>COORDINATES: 37.7749° N, 122.4194° W</span>
        </div>

        <button
          onClick={() => scrollToSection('kinetic-text')}
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL TO DESCEND</span>
          <ArrowDown className="w-4 h-4 text-purple-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
