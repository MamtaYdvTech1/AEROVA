import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const { playAddToCart } = useSound();
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playAddToCart();
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#05020A] border-t border-purple-500/20 text-white overflow-hidden pt-20 pb-12">
      {/* Background Architectural Beams & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/10 blur-[140px]" />
        <div className="absolute inset-y-0 left-1/4 w-[1px] bg-purple-500/5" />
        <div className="absolute inset-y-0 right-1/4 w-[1px] bg-purple-500/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-[#CCFF00] p-[1.5px]">
                <div className="w-full h-full bg-[#080414] rounded-full flex items-center justify-center font-mono font-bold text-sm text-white">
                  0G
                </div>
              </div>
              <h3 className="font-display font-black text-3xl tracking-tight text-white">
                AEROVA
              </h3>
            </div>

            <p className="font-display text-xl text-purple-200/90 max-w-md font-light leading-relaxed">
              &ldquo;Taste Beyond Gravity. A new generation of flavor, engineered to move differently.&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-10 h-10 rounded-full glass-pill hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Instagram"
                data-cursor="SOCIAL"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#youtube"
                className="w-10 h-10 rounded-full glass-pill hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="YouTube"
                data-cursor="SOCIAL"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 rounded-full glass-pill hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="X / Twitter"
                data-cursor="SOCIAL"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-purple-400 uppercase font-semibold">
                Formulations
              </h4>
              <ul className="space-y-2.5 font-display text-white/70">
                <li><a href="#product-showcase" className="hover:text-white transition-colors">AEROVA Zero</a></li>
                <li><a href="#product-showcase" className="hover:text-white transition-colors">AEROVA Pulse</a></li>
                <li><a href="#product-showcase" className="hover:text-white transition-colors">AEROVA Lime</a></li>
                <li><a href="#product-showcase" className="hover:text-white transition-colors">AEROVA Night</a></li>
                <li><a href="#product-spotlight" className="hover:text-white transition-colors">3D Can Viewer</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-purple-400 uppercase font-semibold">
                Universe
              </h4>
              <ul className="space-y-2.5 font-display text-white/70">
                <li><a href="#ingredients" className="hover:text-white transition-colors">Active Botanicals</a></li>
                <li><a href="#story" className="hover:text-white transition-colors">Zero-G Manifesto</a></li>
                <li><a href="#experience" className="hover:text-white transition-colors">Kinetic Physics</a></li>
                <li><a href="#lab" className="hover:text-white transition-colors">Clean Standards</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs tracking-widest text-purple-400 uppercase font-semibold">
              JOIN THE ZERO-G DISPATCH
            </h4>
            <p className="text-xs text-white/60">
              Receive limited-batch micro-drops, sub-orbital tasting invitations, and 15% off your first case.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-center gap-3 text-xs font-mono text-emerald-300">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>WELCOME TO ZERO-G. USE CODE <strong>ZEROGRAVITY</strong> FOR 20% OFF.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your coordinates (email)..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400 font-mono pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
                    aria-label="Subscribe"
                    data-cursor="JOIN"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Telemetry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 AEROVA BEVERAGE LABS INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-purple-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              GRAVITY: 0.000 m/s²
            </span>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Launch</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
