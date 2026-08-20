import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Plus, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { INGREDIENTS } from '../../data/ingredients';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState<string>('');
  const { addToCart } = useCart();
  const { playClick, playWhoosh } = useSound();

  // Keyboard shortcut Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.flavorProfile.some((f) => f.toLowerCase().includes(q)) ||
      p.benefits.some((b) => b.toLowerCase().includes(q))
    );
  });

  const filteredIngredients = INGREDIENTS.filter((i) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      i.name.toLowerCase().includes(q) ||
      i.benefit.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    );
  });

  const handleProductClick = (productId: string) => {
    playClick();
    if (onSelectProduct) {
      onSelectProduct(productId);
    }
    const elem = document.getElementById('product-spotlight');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Search Dialog Box */}
      <div className="relative w-full max-w-2xl bg-[#0F0824] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-950/80 z-10">
        {/* Search Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Search className="w-6 h-6 text-purple-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search zero-gravity flavors, ingredients, adaptogens..."
            className="w-full bg-transparent text-lg text-white placeholder-white/40 focus:outline-none font-display"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto mt-4 pr-1 space-y-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-purple-300/60 uppercase">
              Flavors ({filteredProducts.length})
            </span>

            <div className="mt-2 space-y-2">
              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-white/40 text-sm">
                  No flavor formulations matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xs text-white shadow-inner"
                        style={{ backgroundColor: product.themeColor }}
                      >
                        0G
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                            ${product.packOptions[1].price} (12pk)
                          </span>
                        </div>
                        <p className="text-xs text-white/50 line-clamp-1">
                          {product.flavorProfile.join(' • ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 12, 1);
                        }}
                        className="p-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="Add 12-pack to Cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Filtered Ingredients if query matches */}
          {filteredIngredients.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-purple-300/60 uppercase">
                Active Botanical Compounds
              </span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredIngredients.map((ing) => (
                  <div
                    key={ing.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5"
                  >
                    <span className="text-xl">{ing.icon}</span>
                    <div>
                      <h5 className="font-bold text-xs text-white">{ing.name}</h5>
                      <p className="text-[11px] text-white/50 line-clamp-2 mt-0.5">{ing.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
