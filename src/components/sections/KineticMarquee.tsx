import React from 'react';
import { Sparkles } from 'lucide-react';

export const KineticMarquee: React.FC = () => {
  return (
    <section id="kinetic-text" className="relative py-20 bg-[#080414] overflow-hidden border-y border-purple-500/15">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#CCFF00]/5 blur-[130px] pointer-events-none" />

      {/* Top Velocity Track - Scrolling Left */}
      <div className="flex whitespace-nowrap overflow-hidden py-3 border-b border-white/5 bg-white/[0.01]">
        <div className="flex gap-8 items-center animate-marquee font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-purple-300/70 font-semibold">
          <span>• A NEW GENERATION OF FLAVOR</span>
          <span>• ENGINEERED TO MOVE DIFFERENTLY</span>
          <span>• 0G CELLULAR HYDRATION</span>
          <span>• SUNTHEANINE® ALPHA BRAINWAVES</span>
          <span>• CRYOGENIC BOTANICAL EXTRACTION</span>
          <span>• ZERO SUGAR • ZERO WEIGHT</span>
          <span>• A NEW GENERATION OF FLAVOR</span>
          <span>• ENGINEERED TO MOVE DIFFERENTLY</span>
          <span>• 0G CELLULAR HYDRATION</span>
          <span>• SUNTHEANINE® ALPHA BRAINWAVES</span>
        </div>
      </div>

      {/* Center Large Kinetic Editorial Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>ZERO-G BIO-KINETICS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white uppercase max-w-5xl mx-auto select-none">
          <span className="block text-white/40 hover:text-white transition-colors duration-500">
            WE RE-ENGINEERED
          </span>
          <span className="block gradient-text-rainbow my-2 transform hover:scale-[1.02] transition-transform duration-500">
            REFRESHMENT
          </span>
          <span className="block text-stroke-glow hover:text-[#A855F7] transition-colors duration-500">
            FOR ZERO GRAVITY.
          </span>
        </h2>

        <p className="mt-8 text-base sm:text-xl font-display text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          Traditional drinks weigh you down with synthetic sugars and jittery caffeine spikes. AEROVA combines sub-polar marine electrolytes with adaptogenic nootropics to create pure, weightless momentum.
        </p>
      </div>

      {/* Bottom Velocity Track - Scrolling Right */}
      <div className="flex whitespace-nowrap overflow-hidden py-3 border-t border-white/5 bg-white/[0.01]">
        <div
          className="flex gap-8 items-center animate-marquee font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-white/50 font-semibold"
          style={{ animationDirection: 'reverse' }}
        >
          <span>✦ AEROVA ZERO (OBSIDIAN)</span>
          <span>✦ AEROVA PULSE (DRAGONFRUIT)</span>
          <span>✦ AEROVA LIME (KEY LIME & MINT)</span>
          <span>✦ AEROVA NIGHT (ADAPTOGENIC CALM)</span>
          <span>✦ AEROVA ZERO (OBSIDIAN)</span>
          <span>✦ AEROVA PULSE (DRAGONFRUIT)</span>
          <span>✦ AEROVA LIME (KEY LIME & MINT)</span>
          <span>✦ AEROVA NIGHT (ADAPTOGENIC CALM)</span>
        </div>
      </div>
    </section>
  );
};
