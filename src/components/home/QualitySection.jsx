import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { productShowcase } from '../../data/foodData';
import confetti from 'canvas-confetti';

export const QualitySection = () => {
  const { addToCart } = useCart();

  const handleOrder = (product, e) => {
    addToCart(
      {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      },
      1
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#F59E0B', '#ffffff', '#EFA02A', '#D97706'],
    });
  };

  return (
    <section className="bg-stone-950 text-white relative">
      
      {/* 3 Full-Screen Product Pages */}
      {productShowcase.map((product, idx) => {
        const isEven = idx % 2 === 1;

        return (
          <div
            key={product.id}
            className="min-h-screen py-20 sm:py-28 flex items-center justify-center relative border-b border-white/5 overflow-hidden"
          >
            {/* Ambient Lighting Halo */}
            <div
              className={`absolute top-1/2 ${
                isEven ? 'left-1/3' : 'right-1/3'
              } -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none opacity-40 ${product.glowColor}`}
            />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full relative z-10">
              
              {/* Parent motion container controls reliable viewport observation */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                
                {/* Text Content Column */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? 160 : -160,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  

                  {/* Title with Wide Letter Spacing & Subtitle */}
                  <div className="space-y-3">
                    <h3 className="font-hero-big text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white leading-tight">
                      {product.title}
                    </h3>
                    <p className={`text-lg sm:text-xl font-bold tracking-wide ${product.accentColor}`}>
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Authentic Culinary Specifications */}
                  <div className="pt-4 space-y-3">
                    {product.specs.map((spec, specIdx) => (
                      <div key={specIdx}>
                        <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                          <span className="text-stone-400 font-medium">{spec.label}</span>
                          <span className="text-white font-black tracking-wide">{spec.value}</span>
                        </div>
                        {specIdx < product.specs.length - 1 && (
                          <div className="w-full h-px bg-white/10 my-1" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Console: Price & Buttons */}
                  <div className="pt-6 flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-black text-white">
                      {product.priceDisplay || `$${product.price.toFixed(2)}`}
                    </span>

                    <button
                      onClick={(e) => handleOrder(product, e)}
                      className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Order</span>
                    </button>

                    <Link
                      to={product.link}
                      className="px-5 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/15"
                    >
                      <span>Explore Options</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </Link>
                  </div>
                </motion.div>

                {/* Massive Food Image Column (NO Card, NO Box!) */}
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: isEven ? -160 : 160,
                      scale: 0.9,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className={`lg:col-span-6 flex items-center justify-center relative ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Subtle Glowing Center Halo */}
                  <div className={`absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 ${product.glowColor}`} />

                  {/* Floating Large Food Image */}
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: 'easeInOut',
                    }}
                    className="w-full max-w-md sm:max-w-lg lg:max-w-xl max-h-[55vh] lg:max-h-[62vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative z-10 transition-transform duration-500 hover:scale-105 select-none"
                  />
                </motion.div>

              </motion.div>
            </div>
          </div>
        );
      })}

    </section>
  );
};
