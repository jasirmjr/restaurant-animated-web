import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundTypography = ({ text, slideKey }) => {
  const characters = text.split('');
  const isLongWord = characters.length > 6;

  // Snappy ease
  const smoothEase = [0.16, 1, 0.3, 1];

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none overflow-hidden z-0 px-4 sm:px-8 md:px-12">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 0.96, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.04, y: -15 }}
          transition={{
            duration: 0.4,
            ease: smoothEase,
          }}
          className="w-full flex items-center justify-between text-center leading-none"
        >
          {characters.map((char, index) => (
            <span
              key={`${slideKey}-${index}`}
              className={`font-hero-big text-white font-black uppercase leading-none inline-block transform ${
                isLongWord
                  ? 'text-[13vw] sm:text-[15vw] md:text-[16vw] lg:text-[17vw]'
                  : 'text-[18vw] sm:text-[20vw] md:text-[22vw] lg:text-[23vw]'
              }`}
              style={{
                lineHeight: 0.8,
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
