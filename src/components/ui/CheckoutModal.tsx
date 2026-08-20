import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Lock, Sparkles, Truck, ArrowRight, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useSound } from '../../context/SoundContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    finalTotal,
    subtotal,
    discountAmount,
    shippingCost,
    clearCart,
  } = useCart();

  const { playClick, playAddToCart } = useSound();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@zerogravity.io',
    address: '420 Orbital Boulevard, Suite 8A',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '982',
    deliveryTier: 'express',
  });

  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStep('processing');

    const generatedOrder = `AEROVA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);

    setTimeout(() => {
      setStep('success');
      playAddToCart();
      // Trigger festive zero-g confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#FF3366', '#CCFF00', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
      clearCart();
    }, 1800);
  };

  const handleFinish = () => {
    setStep('form');
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fadeIn"
        onClick={step === 'processing' ? undefined : handleFinish}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#0E0720] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/90 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center font-mono font-bold text-xs text-white">
              0G
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">
                {step === 'success' ? 'ORDER CONFIRMED' : 'ORBITAL CHECKOUT'}
              </h3>
              <p className="text-xs text-purple-300/70 font-mono">
                {step === 'success' ? `DISPATCH ID: #${orderNumber}` : 'SECURE ENCRYPTED DISPATCH'}
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={handleFinish}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleSubmitOrder} className="mt-6 space-y-5">
            {/* Quick Apple Pay / Google Pay Express Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="py-3 px-4 rounded-2xl bg-white text-black font-display font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow-md"
              >
                <span>Pay Express</span>
              </button>
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <span>G Pay Express</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="text-[10px] font-mono uppercase text-white/40">Or standard dispatch</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Shipping Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono tracking-wider uppercase text-purple-300/80 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> 1. Delivery Destination
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Email Coordinates</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/50 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-white/50 mb-1">Zip</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <h4 className="text-xs font-mono tracking-wider uppercase text-purple-300/80 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> 2. Payment Encryption
              </h4>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-white font-mono">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400" /> Card Information
                  </span>
                  <span className="text-white/40">VISA / MC / AMEX</span>
                </div>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.expDate}
                    onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                  />
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    placeholder="CVV"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-white/60">Total Authorization</span>
                <div className="font-display font-black text-xl text-white">
                  ${finalTotal.toFixed(2)}
                </div>
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-[#080414] font-display font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#CCFF00]/20 cursor-pointer"
              >
                <span>Authorize & Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PROCESSING */}
        {step === 'processing' && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white">
                0G
              </div>
            </div>
            <h4 className="font-display font-black text-xl text-white">
              INITIALIZING ZERO-GRAVITY LAUNCH...
            </h4>
            <p className="text-xs font-mono text-purple-300/70 max-w-xs">
              Encrypting orbital payload data and securing thermal batch locks.
            </p>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-900/30 to-purple-950/20 border border-purple-500/40 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display font-black text-2xl text-white">
                LAUNCH CONFIRMED!
              </h4>
              <p className="text-xs font-mono text-white/70 max-w-sm mx-auto">
                Your AEROVA zero-gravity vault is packed and entering cryogenic sub-orbital transit. Tracking data sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Dispatch ID:</span>
                <span className="text-white font-bold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Destination:</span>
                <span className="text-white">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Estimated Arrival:</span>
                <span className="text-[#CCFF00] font-bold">Tomorrow by 12:00 PM</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-display font-bold text-xs uppercase tracking-wider transition-all"
            >
              Return to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
