import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { heroSlides } from '../../data/foodData';
import { HeroSlide } from './HeroSlide';
import { SliderControls } from './SliderControls';
import { useCart } from '../../context/CartContext';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const { activeSlideIndex, setActiveSlideIndex, addToCart } = useCart();
  const [direction, setDirection] = useState(1);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Monitor scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate slide scroll offsets
  const scrollToSlide = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    
    // Exact positions within the 300vh duration: 0%, 50%, 95%
    const offsets = [0, 0.5, 0.96];
    const targetScroll = containerTop + (offsets[index] ?? 0) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Synchronize scroll progress (0.0 to 1.0) with activeSlideIndex
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      let targetIndex = 0;
      if (progress < 0.33) {
        targetIndex = 0; // Burger
      } else if (progress < 0.66) {
        targetIndex = 1; // Roll
      } else {
        targetIndex = 2; // Pizza
      }

      if (targetIndex !== activeSlideIndex) {
        setDirection(targetIndex > activeSlideIndex ? 1 : -1);
        setActiveSlideIndex(targetIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeSlideIndex, setActiveSlideIndex]);

  // Handle Navbar link clicks (BURGER, ROLL, PIZZA)
  useEffect(() => {
    const handleCustomScroll = (e) => {
      if (typeof e.detail === 'number') {
        scrollToSlide(e.detail);
      }
    };
    window.addEventListener('scroll-to-slide', handleCustomScroll);
    return () => window.removeEventListener('scroll-to-slide', handleCustomScroll);
  }, []);

  const currentSlide = heroSlides[activeSlideIndex] || heroSlides[0];

  const handleNext = () => {
    const nextIdx = (activeSlideIndex + 1) % heroSlides.length;
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    scrollToSlide(prevIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex]);

  // Parallax mouse movement handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMouseOffset({
      x: (x / rect.width) * 45,
      y: (y / rect.height) * 45,
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleOrderNow = () => {
    addToCart(
      {
        id: currentSlide.id,
        name: currentSlide.subtitle || currentSlide.title,
        price: currentSlide.price,
        image: currentSlide.image,
        category:
          currentSlide.id === 'burger'
            ? 'burgers'
            : currentSlide.id === 'roll'
            ? 'rolls'
            : 'pizza',
      },
      1,
      {
        summary: `Hero Special (${currentSlide.badge})`,
      }
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh]"
      style={{
        backgroundColor: currentSlide.bgColor,
        transition: 'background-color 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Pinned Sticky Viewport: Locked at top: 0 for the entire 300vh scroll runway */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 transition-colors duration-1000 ease-in-out overflow-hidden"
        style={{
          backgroundColor: currentSlide.bgColor,
        }}
      >

      

        {/* Main interactive slide stage */}
        <div className="flex-1 flex items-center justify-center relative w-full">
          <HeroSlide
            currentSlide={currentSlide}
            direction={direction}
            mouseOffset={mouseOffset}
          />
        </div>

        {/* Bottom controls bar: Micro-copy, Order Now button, and arrow controls */}
        <SliderControls
          currentSlide={currentSlide}
          currentIndex={activeSlideIndex}
          totalSlides={heroSlides.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onOrderNow={handleOrderNow}
        />
      </section>
    </div>
  );
};
