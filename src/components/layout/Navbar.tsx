import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { totalItems, openCart } = useCart();
  const { isMuted, toggleMute, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#product-showcase' },
    { name: 'Experience', href: '#color-transformation' },
    { name: '3D Lab', href: '#product-spotlight' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Story', href: '#story' },
  ];

  const handleNavClick = (href: string) => {
    playClick();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#080414]/80 backdrop-blur-xl border-b border-purple-500/15 shadow-lg shadow-black/40'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group select-none cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-cursor="HOME"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 via-purple-500 to-[#CCFF00] p-[1.5px] shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080414] rounded-full flex items-center justify-center font-mono font-bold text-xs text-white">
                0G
              </div>
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              AEROVA
            </span>
          </a>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2 rounded-full text-xs font-display font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                data-cursor="LINK"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => {
                playClick();
                onOpenSearch();
              }}
              className="p-2.5 rounded-full glass-pill hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Search Formulations (Cmd+K)"
              data-cursor="SEARCH"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Sound Toggle (Mobile & Desktop) */}
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full glass-pill hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer md:hidden"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#CCFF00]" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full glass-pill hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Open Zero-G Vault Cart"
              data-cursor="CART"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Magnetic Explore CTA (Desktop) */}
            <div className="hidden lg:block">
              <MagneticButton
                size="sm"
                variant="primary"
                onClick={() => {
                  const el = document.getElementById('product-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                cursorLabel="SHOP"
              >
                <span>Shop Zero-G</span>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClick();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="p-2.5 rounded-full glass-pill hover:bg-white/15 text-white md:hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080414]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 animate-fadeIn">
          <div className="space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase">
              NAVIGATION SENSORS
            </span>
            <div className="space-y-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block font-display font-black text-3xl text-white hover:text-purple-300 transition-colors uppercase tracking-tight"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCart();
              }}
              className="w-full py-4 rounded-2xl bg-purple-600 text-white font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Open Vault ({totalItems})</span>
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-white/50">
              <span>AEROVA ZERO-G BEVERAGES</span>
              <span>2026 EDITION</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
