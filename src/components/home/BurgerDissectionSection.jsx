import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LEFT_DETAILS = [
  {
    title: 'Artisanal Brioche Crown',
    desc: 'Golden butter-glazed crown with toasted white & black sesame',
  },
  {
    title: 'Crisp Garden Greens',
    desc: 'Organic butterhead lettuce & vine-ripened heirloom tomatoes',
  },
  {
    title: 'Pickles & Onion Relish',
    desc: 'House barrel-brined dill pickles & caramelized red relish',
  },
];

const RIGHT_DETAILS = [
  {
    title: 'Aged Double Cheddar',
    desc: 'Sharp Wisconsin cheddar melted directly on seared beef crust',
  },
  {
    title: '100% Wagyu Smash Beef',
    desc: 'Dual smash patties hard-seared at 400°F for caramelized lacy crunch',
  },
  {
    title: 'Black Truffle Crave Sauce',
    desc: 'Signature umami mayo spread over butter-toasted brioche heel',
  },
];

export const BurgerDissectionSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Parallax tracking for cinematic depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.4;
    }
  }, []);

  const handleVideoReady = (e) => {
    e.currentTarget.playbackRate = 1.4;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] bg-black overflow-hidden flex items-center justify-between text-white select-none"
    >
      {/* 1. Full-Screen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoReady}
          onPlay={handleVideoReady}
          className="w-full h-full object-cover sm:object-contain bg-black"
        >
          <source src="/videos/burger-assembly.mp4" type="video/mp4" />
          <source src="/images/1009.mp4" type="video/mp4" />
        </video>

        {/* Ambient Vignette & Cinema Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-80" />
      </div>

      {/* 2. Simultaneous Listing Sub-Details (Left & Right Flanks) */}
      <motion.div
        style={{ y: contentParallaxY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-none"
      >
        
        {/* Left Side: 3 Sub-Details (Pure Typography, No Box, No Numbers) */}
        <div className="w-full md:w-[320px] lg:w-[360px] flex flex-col items-start space-y-4 pointer-events-auto">
          {LEFT_DETAILS.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: -40, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.38,
                  delay: 0.08 + idx * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full space-y-1 text-left"
              >
                <h4 className="text-white font-black text-base sm:text-lg uppercase tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  {item.title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-xs">
                  {item.desc}
                </p>
              </motion.div>

              {/* Long White Separator Line between details */}
              {idx < LEFT_DETAILS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.16 + idx * 0.16,
                    ease: 'easeOut',
                  }}
                  className="w-56 sm:w-64 h-[1.5px] bg-white/60 my-2 origin-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Center Space: Unobstructed view of the assembling burger */}
        <div className="hidden md:flex flex-1" />

        {/* Right Side: 3 Sub-Details (Pure Typography, No Box, No Numbers) */}
        <div className="w-full md:w-[320px] lg:w-[360px] flex flex-col items-start md:items-end text-left md:text-right space-y-4 pointer-events-auto">
          {RIGHT_DETAILS.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: -40, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.38,
                  delay: 0.08 + idx * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full space-y-1 text-left md:text-right"
              >
                <h4 className="text-white font-black text-base sm:text-lg uppercase tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  {item.title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-xs md:ml-auto">
                  {item.desc}
                </p>
              </motion.div>

              {/* Long White Separator Line between details */}
              {idx < RIGHT_DETAILS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.28,
                    delay: 0.16 + idx * 0.16,
                    ease: 'easeOut',
                  }}
                  className="w-56 sm:w-64 h-[1.5px] bg-white/60 my-2 md:ml-auto origin-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                />
              )}
            </React.Fragment>
          ))}
        </div>

      </motion.div>



      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
};
