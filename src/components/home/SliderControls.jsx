import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SliderControls = ({
  currentSlide,
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onOrderNow,
}) => {
  const handleOrderClick = (e) => {
    // Confetti celebration
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#ffffff', '#000000', '#F59E0B', '#84CC16', '#EA580C'],
    });

    onOrderNow();
  };

  return (
    <div className="relative z-30 w-full px-6 sm:px-10 md:px-16 pb-8 md:pb-12 pt-4">
  <div className="relative max-w-7xl mx-auto flex items-end justify-between min-h-[56px]">
 
    {/* Perfectly Centered "Order Now" Button */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 flex flex-col items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOrderClick}
        className="group relative inline-flex items-center justify-center gap-3 bg-black hover:bg-neutral-900 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-4 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 border border-white/10 overflow-hidden"
      >
        {/* Shimmer light effect */}
        <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
        <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span>Order Now</span>
        <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>

  </div>
</div>
  );
};
