import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StorySection = () => {
  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Our Kitchen Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Obsessive Craftsmanship In Every Single Bite
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            We reject mass-produced shortcuts. Every smash burger starts with prime grass-fed cuts, every kathi wrap is rolled to order on cast-iron tawas, and every pizza crust undergoes a 48-hour cold fermentation.
          </p>
        </div>

        {/* Feature Grid with visual breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-stone-950/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-white">800°F Hardwood Hearth</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Our custom-built volcanic stone ovens develop that distinct smoky char, blistered leopard crust, and caramelization that electric convection ovens can never match.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <span>Authentic Oak Smoke</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-stone-950/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-lime-500/20 text-lime-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-white">Farm-To-Tawa Produce</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Local vine-ripened tomatoes, crisp butterhead lettuce, and farm dairy paneer delivered daily before sunrise from family-owned regional organic farms.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400">
              <span>Zero Preservatives</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-stone-950/70 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-3 text-white">48-Hr Fermentation</h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Time is the secret ingredient. Our dough develops complex sourdough nuance and airy honeycomb crumb structure, making it light, digestible, and ultra-crisp.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
              <span>Artisanal Yeast Strains</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>

        {/* Story Banner */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Want to explore our story and meet our chefs?</h3>
            <p className="text-stone-400 text-sm">
              Read how a humble street cart passion turned into our critically acclaimed modern dining sanctuary.
            </p>
          </div>
          <Link
            to="/about"
            className="px-8 py-4 bg-white text-stone-900 hover:bg-stone-200 font-extrabold rounded-full transition-all flex items-center gap-2 shadow-lg active:scale-95 shrink-0"
          >
            <span>Read Our Full Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
