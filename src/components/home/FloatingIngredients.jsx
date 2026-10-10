import React from 'react';
import { motion } from 'framer-motion';

export const FloatingIngredients = ({ mouseOffset = { x: 0, y: 0 }, layer = 'front' }) => {
  const depthFactor = layer === 'front' ? 1.4 : 0.6;

  if (layer === 'back') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Realistic Blurred Tomato Slice (Back Left) */}
        <motion.div
          animate={{
            x: mouseOffset.x * 0.45 * depthFactor,
            y: mouseOffset.y * 0.35 * depthFactor,
            rotate: [-15, 10, -15],
          }}
          transition={{
            x: { type: 'spring', damping: 28, stiffness: 45 },
            y: { type: 'spring', damping: 28, stiffness: 45 },
            rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute top-[18%] left-[8%] md:left-[12%] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-75 blur-[2.5px]"
        >
          <img
            src="/images/garnish-tomato.png"
            alt="Blurred Tomato Slice"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Realistic Blurred Mint Leaf (Back Right) */}
        <motion.div
          animate={{
            x: -mouseOffset.x * 0.4 * depthFactor,
            y: -mouseOffset.y * 0.35 * depthFactor,
            rotate: [30, 10, 30],
          }}
          transition={{
            x: { type: 'spring', damping: 28, stiffness: 45 },
            y: { type: 'spring', damping: 28, stiffness: 45 },
            rotate: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute top-[22%] right-[10%] md:right-[15%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 opacity-70 blur-[2px]"
        >
          <img
            src="/images/garnish-mint.png"
            alt="Blurred Mint Leaf"
            className="w-full h-full object-contain transform rotate-45"
          />
        </motion.div>
      </div>
    );
  }

  // FRONT LAYER (Photorealistic Crisp Assets - Zero Shadows)
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* 1. Realistic Fresh Mint Leaf with water droplets (Top Left) */}
      <motion.div
        animate={{
          x: mouseOffset.x * 0.9 * depthFactor,
          y: mouseOffset.y * 0.9 * depthFactor + 6,
          rotate: [-20, -5, -20],
        }}
        transition={{
          x: { type: 'spring', damping: 26, stiffness: 50 },
          y: { type: 'spring', damping: 26, stiffness: 50 },
          rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-[18%] left-[6%] md:left-[12%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
      >
        <img
          src="/images/garnish-mint.png"
          alt="Fresh Mint Leaf"
          className="w-full h-full object-contain transform -rotate-12 filter brightness-105 contrast-110"
        />
      </motion.div>

      {/* 2. Realistic Crisp Juicy Tomato Slice (Bottom Right) */}
      <motion.div
        animate={{
          x: -mouseOffset.x * 1.1 * depthFactor,
          y: -mouseOffset.y * 1.1 * depthFactor,
          rotate: [10, 25, 10],
        }}
        transition={{
          x: { type: 'spring', damping: 26, stiffness: 50 },
          y: { type: 'spring', damping: 26, stiffness: 50 },
          rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-[20%] right-[7%] md:right-[14%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
      >
        <img
          src="/images/garnish-tomato.png"
          alt="Fresh Tomato Slice"
          className="w-full h-full object-contain filter brightness-105 contrast-105"
        />
      </motion.div>

      {/* 3. Realistic Second Mint Leaf (Top Right) */}
      <motion.div
        animate={{
          x: -mouseOffset.x * 0.85 * depthFactor,
          y: mouseOffset.y * 0.8 * depthFactor,
          rotate: [30, 15, 30],
        }}
        transition={{
          x: { type: 'spring', damping: 26, stiffness: 50 },
          y: { type: 'spring', damping: 26, stiffness: 50 },
          rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-[24%] right-[8%] md:right-[16%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
      >
        <img
          src="/images/garnish-mint.png"
          alt="Fresh Mint Sprig"
          className="w-full h-full object-contain transform rotate-45 scale-95"
        />
      </motion.div>
    </div>
  );
};
