import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundTypography } from './BackgroundTypography';
import { FloatingIngredients } from './FloatingIngredients';

export const HeroSlide = ({
  currentSlide,
  direction = 1,
  mouseOffset = { x: 0, y: 0 },
}) => {
  // Snappy, seamless transition curve
  const smoothEase = [0.16, 1, 0.3, 1];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      y: 10,
      opacity: 0,
      scale: 0.92,
      rotate: dir > 0 ? 4 : -4,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: smoothEase,
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      y: -10,
      opacity: 0,
      scale: 0.92,
      rotate: dir > 0 ? -4 : 4,
      transition: {
        duration: 0.35,
        ease: smoothEase,
      },
    }),
  };

  return (
    <div className="relative w-full h-[62vh] sm:h-[66vh] md:h-[68vh] lg:h-[72vh] flex items-center justify-center overflow-hidden">
      
      {/* 1. Massive white backdrop text */}
      <BackgroundTypography
        text={currentSlide.title}
        slideKey={currentSlide.id}
      />

      {/* 2. Floating ingredients BACK layer */}
      <FloatingIngredients
        mouseOffset={mouseOffset}
        layer="back"
      />

      {/* 3. Central 3D Floating Food Item */}
      <div className="relative z-10 w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex items-center justify-center w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            {/* Continuous floating loop and mouse tilt container */}
            <motion.div
              animate={{
                y: [-7, 7, -7],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                x: mouseOffset.x * 0.4,
                y: mouseOffset.y * 0.4,
              }}
              className="relative select-none flex items-center justify-center p-4"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                draggable={false}
                className="max-h-[38vh] sm:max-h-[44vh] md:max-h-[50vh] lg:max-h-[55vh] w-auto object-contain transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Floating ingredients FRONT layer */}
      <FloatingIngredients
        mouseOffset={mouseOffset}
        layer="front"
      />

    </div>
  );
};
