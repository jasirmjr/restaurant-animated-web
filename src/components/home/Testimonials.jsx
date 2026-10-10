import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { customerTestimonials } from '../../data/foodData';

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prevReview = () => {
    setCurrent((prev) => (prev - 1 + customerTestimonials.length) % customerTestimonials.length);
  };

  const nextReview = () => {
    setCurrent((prev) => (prev + 1) % customerTestimonials.length);
  };

  const item = customerTestimonials[current];

  return (
    <section className="py-24 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Loved By Chefs & Gastronomes
          </h2>
        </div>

        {/* Testimonial Box */}
        <div className="max-w-4xl mx-auto bg-stone-900/60 border border-white/10 rounded-3xl p-8 sm:p-14 relative shadow-2xl backdrop-blur-xl">
          <Quote className="absolute top-8 right-8 sm:top-12 sm:right-12 w-16 h-16 text-white/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Rating stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-3 text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Featured Review
                </span>
              </div>

              {/* Comment */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug text-white/95">
                "{item.comment}"
              </p>

              {/* Author info & dish */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                  />
                  <div>
                    <h4 className="font-extrabold text-base text-white">{item.name}</h4>
                    <p className="text-xs text-stone-400">{item.role}</p>
                  </div>
                </div>

                <div className="bg-stone-800/80 px-4 py-2 rounded-2xl border border-white/5 self-start sm:self-auto">
                  <span className="text-[11px] text-stone-400 block font-medium">Favorite order:</span>
                  <span className="text-xs font-bold text-amber-400">{item.dish}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={prevReview}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center border border-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
