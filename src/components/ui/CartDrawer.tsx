import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    discountError,
    applyDiscount,
    removeDiscount,
    freeShippingThreshold,
    shippingCost,
    finalTotal,
    openCheckout,
  } = useCart();

  const { playClick } = useSound();
  const [promoInput, setPromoInput] = useState<string>('');

  if (!isOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    playClick();
    if (applyDiscount(promoInput)) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[1050] flex justify-end">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeCart}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0B061A] border-l border-purple-500/20 shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <h2 className="font-display font-black text-xl text-white tracking-tight">
              YOUR ZERO-G VAULT
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              {totalItems}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
            <span className="text-white/70">
              {remainingForFreeShipping > 0 ? (
                <>
                  Add <strong className="text-[#CCFF00]">${remainingForFreeShipping.toFixed(2)}</strong> for Free Express Delivery
                </>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> FREE ZERO-G SHIPPING UNLOCKED
                </span>
              )}
            </span>
            <span className="text-white/40">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-[#CCFF00] transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-purple-400">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">Your vault is weightless</h3>
              <p className="text-sm text-white/50 max-w-xs mb-6">
                Explore our signature 4 zero-gravity formulations and load your vault.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  const el = document.getElementById('product-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-display text-xs font-bold uppercase tracking-wider"
              >
                Explore Flavors
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-all"
              >
                {/* Can Mini Pill Art */}
                <div
                  className="w-14 h-16 rounded-xl flex flex-col items-center justify-center font-display font-bold text-[10px] text-white shadow-md relative overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: item.product.themeColor }}
                >
                  <span className="font-mono text-[9px] text-white/70">355ML</span>
                  <span className="text-xs font-black">0G</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-display font-bold text-sm text-white truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-purple-300/80 font-mono mb-2">
                    {item.packTitle}
                  </p>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-sm text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-6 bg-[#080314] border-t border-white/10 space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Tag className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>CODE: <strong>{discountCode}</strong> (-${discountAmount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-white/50 hover:text-red-400 text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder='Promo code (try "ZEROGRAVITY")'
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}
              {discountError && (
                <p className="text-[11px] text-red-400 mt-1 font-mono">{discountError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-mono text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#CCFF00]">
                  <span>Zero-G Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Orbital Shipping</span>
                <span className="text-white">
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-400">FREE</strong>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-display font-black text-white">
                <span>Total</span>
                <span className="text-purple-300 font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={openCheckout}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 hover:shadow-purple-600/50 transition-all cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-white/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-BIT ENCRYPTED ZERO-G TRANSACTION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
