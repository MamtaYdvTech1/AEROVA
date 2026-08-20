import React, { useState } from 'react';
import { Sparkles, Plus, Minus, Check, Star, ShieldCheck, Thermometer, Droplet, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { InteractiveViewer3D } from '../3d/InteractiveViewer3D';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

interface ProductSpotlightProps {
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
}

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({
  selectedProductId,
  onSelectProduct,
}) => {
  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [selectedPackSize, setSelectedPackSize] = useState<number>(12);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'profile' | 'nutrition' | 'specs'>('profile');

  const { addToCart } = useCart();
  const { playClick, playHover } = useSound();

  const currentPack =
    currentProduct.packOptions.find((p) => p.size === selectedPackSize) ||
    currentProduct.packOptions[0];

  const handlePackChange = (size: number) => {
    playClick();
    setSelectedPackSize(size);
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedPackSize, quantity);
  };

  return (
    <section id="product-spotlight" className="relative py-24 sm:py-32 bg-[#06030E] overflow-hidden border-t border-purple-500/15">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-30 transition-colors duration-700"
          style={{ backgroundColor: currentProduct.themeColor }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>3D INTERACTIVE SPEC LAB</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              PRODUCT SPOTLIGHT
            </h2>
          </div>

          {/* Quick Flavor Switcher Buttons */}
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  playClick();
                  onSelectProduct(prod.id);
                }}
                onMouseEnter={playHover}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  prod.id === currentProduct.id
                    ? 'bg-purple-600/40 text-white border border-purple-400/60 shadow-md'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
                data-cursor="SWITCH"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: prod.accentColor }}
                />
                <span>{prod.name.replace('AEROVA ', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Layout: Left 3D Viewer | Right E-Commerce Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Interactive 3D Orbit / Inspect Canvas */}
          <div className="lg:col-span-6 w-full">
            <InteractiveViewer3D product={currentProduct} />

            {/* Quick Micro-Badges below 3D viewer */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-mono text-white/70">
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="line-clamp-1">{currentProduct.specs.temperature}</span>
              </div>
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2">
                <Droplet className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="line-clamp-1">{currentProduct.specs.carbonation}</span>
              </div>
              <div className="p-3 rounded-2xl glass-pill flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="line-clamp-1">Infinite Recyclable</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Specs, Pack Configurator, and Add-to-Cart */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Review & Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                  ))}
                </div>
                <span className="text-xs font-mono text-white/70">
                  {currentProduct.rating} ({currentProduct.reviewCount} verified orbital reviews)
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
                {currentProduct.name}
              </h3>
              <p className="text-xs font-mono text-purple-300 uppercase tracking-widest mt-1">
                {currentProduct.subtitle}
              </p>
              <p className="text-sm font-display text-white/70 mt-3 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Tabbed Info Switcher */}
            <div className="space-y-4">
              <div className="flex border-b border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 px-4 font-bold transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Tasting Notes
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2.5 px-4 font-bold transition-colors cursor-pointer ${
                    activeTab === 'nutrition'
                      ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Bio-Nutrition
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-4 font-bold transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Origin & Standards
                </button>
              </div>

              {/* Tab Content: Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono">
                  <div className="flex items-start gap-3">
                    <span className="w-16 text-purple-400 font-bold">TOP NOTE:</span>
                    <span className="text-white/80">{currentProduct.tastingNotes.top}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-16 text-purple-400 font-bold">HEART:</span>
                    <span className="text-white/80">{currentProduct.tastingNotes.heart}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-16 text-purple-400 font-bold">BASE:</span>
                    <span className="text-white/80">{currentProduct.tastingNotes.base}</span>
                  </div>
                </div>
              )}

              {/* Tab Content: Nutrition */}
              {activeTab === 'nutrition' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">SERVING</span>
                    <span className="text-white font-bold">{currentProduct.nutrition.servingSize}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">CALORIES</span>
                    <span className="text-white font-bold">{currentProduct.nutrition.calories} kcal</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">SUGARS</span>
                    <span className="text-white font-bold">{currentProduct.nutrition.sugars}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">CLEAN CAFFEINE</span>
                    <span className="text-[#CCFF00] font-bold">{currentProduct.nutrition.caffeine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">SUNTHEANINE®</span>
                    <span className="text-purple-300 font-bold">{currentProduct.nutrition.lTheanine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-white/40 block text-[10px]">ELECTROLYTES</span>
                    <span className="text-cyan-300 font-bold">{currentProduct.nutrition.electrolytes}</span>
                  </div>
                </div>
              )}

              {/* Tab Content: Specs */}
              {activeTab === 'specs' && (
                <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-white/80">
                  <p>• <strong>Water Origin:</strong> {currentProduct.specs.origin}</p>
                  <p>• <strong>Formulation:</strong> Zero artificial sweeteners, zero preservatives, 100% non-GMO.</p>
                  <p>• <strong>Packaging:</strong> Ultra-thin aerospace aluminum can with zero-emission lining.</p>
                </div>
              )}
            </div>

            {/* Pack Size Configurator */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 block">
                SELECT PACK CONFIGURATION
              </span>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {currentProduct.packOptions.map((pack) => (
                  <button
                    key={pack.size}
                    type="button"
                    onClick={() => handlePackChange(pack.size)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                      selectedPackSize === pack.size
                        ? 'bg-purple-900/40 border-purple-400/80 shadow-lg shadow-purple-950/60'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                    data-cursor="SELECT"
                  >
                    {pack.isPopular && (
                      <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-[#CCFF00] text-[#080414] font-mono font-bold text-[9px] uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <span className="block text-xs font-display font-bold text-white">
                      {pack.size}-Can Case
                    </span>
                    <span className="font-mono font-bold text-sm text-purple-200 mt-1 block">
                      ${pack.price}
                    </span>
                    {pack.savings && (
                      <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                        {pack.savings}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between sm:justify-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-sm text-white px-2">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-purple-900/40 hover:shadow-purple-600/50 transition-all cursor-pointer group"
                data-cursor="ADD"
              >
                <span>Add To Vault • ${(currentPack.price * quantity).toFixed(2)}</span>
                <Sparkles className="w-4 h-4 text-[#CCFF00] group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
