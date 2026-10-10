import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    grandTotal,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CRAVE20') {
      setDiscount(0.2);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'FIRSTBITE') {
      setDiscount(0.15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "CRAVE20" for 20% off!');
    }
  };

  const finalTotal = Math.max(0, grandTotal - subtotal * discount);

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    setOrderSuccess(true);
  };

  const handleFinishOrder = () => {
    clearCart();
    setOrderSuccess(false);
    closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-stone-900 border-l border-white/10 text-white flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-wide">Your Order Bag</h2>
                    <p className="text-xs text-stone-400">Fresh artisanal cravings</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Placed Success View */}
              {orderSuccess ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Order Confirmed!</h3>
                  <p className="text-stone-400 text-sm mb-6 max-w-xs">
                    Your kitchen order #CRV-8942 has been dispatched to our master chefs. Preparation starts right now!
                  </p>
                  <div className="bg-stone-800/80 rounded-2xl p-4 w-full text-left text-xs text-stone-300 space-y-2 mb-8 border border-white/5">
                    <div className="flex justify-between font-bold text-white">
                      <span>Estimated Arrival</span>
                      <span className="text-amber-400">22 - 28 Mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery To</span>
                      <span>Your Saved Location</span>
                    </div>
                  </div>
                  <button
                    onClick={handleFinishOrder}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-full transition-all"
                  >
                    Back to Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items list */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 text-stone-500">
                          <ShoppingBag className="w-10 h-10" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Your bag is empty</h3>
                        <p className="text-sm text-stone-400 max-w-xs mb-6">
                          Explore our signature burgers, kathi rolls, and wood-fired pizzas!
                        </p>
                        <button
                          onClick={closeCart}
                          className="px-6 py-2.5 bg-white text-stone-900 rounded-full text-sm font-bold hover:bg-stone-200 transition-colors"
                        >
                          Explore Dishes
                        </button>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 bg-stone-800/50 hover:bg-stone-800 p-3.5 rounded-2xl border border-white/5 transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded-xl bg-stone-900/60 p-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                            <p className="text-[11px] text-stone-400 truncate mb-1">
                              {item.optionsText}
                            </p>
                            <span className="text-amber-400 font-extrabold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {/* Quantity control */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-500 hover:text-red-400 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-full border border-white/10">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-stone-300 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer & Checkout Summary */}
                  {cartItems.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-stone-950/80 space-y-4">
                      {/* Promo Code input */}
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Code (Try CRAVE20)"
                          className="flex-1 bg-stone-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 uppercase tracking-wider"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </form>

                      {promoApplied && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Promo code applied! Saved {(discount * 100)}%</span>
                        </div>
                      )}

                      {/* Calculations breakdown */}
                      <div className="space-y-1.5 text-xs text-stone-400">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee {subtotal > 35 && <span className="text-emerald-400 text-[10px]">(Free over $35)</span>}</span>
                          <span className="text-white font-medium">
                            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Tax</span>
                          <span className="text-white font-medium">${tax.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-emerald-400 font-bold">
                            <span>Discount ({discount * 100}%)</span>
                            <span>-${(subtotal * discount).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                          <span>Total Amount</span>
                          <span className="text-amber-400 text-base font-extrabold">
                            ${finalTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <button
                        onClick={handleCheckout}
                        className="w-full py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all"
                      >
                        <span>Confirm & Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
