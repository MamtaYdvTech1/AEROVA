import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Eye, Sparkles, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { CanCanvas } from '../3d/CanCanvas';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

interface ProductShowcaseProps {
  onSelectProductForViewer: (productId: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onSelectProductForViewer,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { playClick, playHover } = useSound();

  const scroll = (direction: 'left' | 'right') => {
    playClick();
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleInspect = (product: Product) => {
    playClick();
    onSelectProductForViewer(product.id);
    const elem = document.getElementById('product-spotlight');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="product-showcase" className="relative py-24 sm:py-32 bg-[#080414] overflow-hidden">
      {/* Background Architectural Beams */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>THE 2026 ZERO-G COLLECTION</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              FLAVOR WITHOUT LIMITS
            </h2>
            <p className="text-sm sm:text-base font-display text-white/60 max-w-lg mt-2">
              Four distinct bio-active formulations calibrated for different energetic states, from laser focus to twilight decompression.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full glass-pill hover:bg-white/15 text-white transition-all cursor-pointer"
              aria-label="Previous Product"
              data-cursor="PREV"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full glass-pill hover:bg-white/15 text-white transition-all cursor-pointer"
              aria-label="Next Product"
              data-cursor="NEXT"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Product Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[300px] sm:w-[340px] rounded-3xl glass-panel glass-panel-hover p-6 flex flex-col justify-between relative group snap-start border border-white/10 hover:border-purple-400/40 transition-all duration-500"
              onMouseEnter={playHover}
            >
              {/* Product Card Top Info */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase"
                  style={{
                    backgroundColor: `${product.accentColor}20`,
                    color: product.accentColor,
                    border: `1px solid ${product.accentColor}40`,
                  }}
                >
                  {product.specs.volume}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{product.rating}</span>
                  <span className="text-white/40">({product.reviewCount})</span>
                </div>
              </div>

              {/* Center 3D Can Visual */}
              <div className="relative h-64 sm:h-72 w-full my-2 flex items-center justify-center">
                {/* Glow Halo behind card can */}
                <div
                  className="absolute w-40 h-40 rounded-full blur-[50px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: product.themeColor }}
                />

                <CanCanvas
                  product={product}
                  enableMouseFollow={false}
                  interactiveDrag={false}
                  autoRotate={true}
                  scale={0.9}
                  showParticles={false}
                  className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-3 pt-2">
                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-purple-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono text-purple-200/70 tracking-wider">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Flavor Notes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.flavorProfile.map((flavor) => (
                    <span
                      key={flavor}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/80"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>

                {/* Pricing & CTA Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block">12-CAN CASE</span>
                    <span className="font-mono font-bold text-base text-white">
                      ${product.packOptions[1].price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInspect(product)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
                      title="Inspect in 3D Lab"
                      data-cursor="3D"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">3D</span>
                    </button>

                    <button
                      onClick={() => addToCart(product, 12, 1)}
                      className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer"
                      title="Quick Add 12-Pack"
                      data-cursor="ADD"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
