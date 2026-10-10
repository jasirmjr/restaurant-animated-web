import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, Heart, Sparkles, ChefHat, Wheat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  const chefs = [
    {
      name: 'Chef Alessandro Rossi',
      role: 'Master Pizzaiolo & Co-Founder',
      origin: 'Naples, Italy',
      quote: 'Flour and water are alive. You must listen to the humidity, the wild yeasts, and the crackle of the wood.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Chef Kabir Sen',
      role: 'Kathi & Spice Master',
      origin: 'Kolkata, India',
      quote: 'The secret to an unforgettable roll is the balance of whole spices toasted on cast iron at high flame.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Chef Maya Thorne',
      role: 'Executive Grill Director',
      origin: 'Brooklyn, New York',
      quote: 'Lace edges aren’t an accident. They are physics, weight, searing heat, and pure relentless passion.',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const milestones = [
    { year: '2019', title: 'The Midnight Tawa Cart', desc: 'Started as a weekend underground street cart serving butter-basted chicken rolls to midnight food lovers.' },
    { year: '2021', title: 'The Wood Hearth Meets The Plancha', desc: 'Introduced our custom double-smash wagyu burger and 800°F volcanic stone pizza hearth under one roof.' },
    { year: '2023', title: 'Michelin Bib Gourmand Recognition', desc: 'Recognized for outstanding culinary execution and value across fast-casual gastronomy.' },
    { year: 'Today', title: '3 Flagship Kitchens & Thriving Tribe', desc: 'Serving thousands of handcrafted daily cravings with zero compromise on ingredients or time.' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Editorial Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Our Kitchen Manifesto
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight">
            Obsessed with Fire, Flour & Flavor.
          </h1>
          <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We exist at the intersection of three historic street-food traditions: the smash burger of NYC, the fragrant tandoori rolls of Kolkata, and the wood-fired hearths of Campania.
          </p>
        </div>

        {/* Editorial Photo Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <div className="md:col-span-7 h-[420px] rounded-3xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal Kitchen In Action"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Hearth Atmosphere</span>
                <h3 className="text-xl font-black text-white">Live Fire, Never Microwave Shortcuts</h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 h-[420px] rounded-3xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
              alt="Dough stretching"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div>
                <span className="text-xs uppercase font-bold text-lime-400 tracking-wider">Natural Fermentation</span>
                <h3 className="text-xl font-black text-white">48 Hours Of Unhurried Rest</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Chef Directors */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">The Culinary Visionaries</span>
            <h2 className="text-3xl sm:text-4xl font-black">Meet Our Founders & Kitchen Heads</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef) => (
              <div
                key={chef.name}
                className="bg-stone-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-colors group shadow-xl"
              >
                <div>
                  <div className="h-64 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-black text-white">{chef.name}</h3>
                  <p className="text-xs font-bold text-amber-400 mb-2">{chef.role}</p>
                  <p className="text-xs text-stone-500 mb-4">{chef.origin}</p>
                  <p className="text-stone-300 text-xs italic leading-relaxed">
                    "{chef.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Evolution */}
        <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-8 sm:p-14 mb-20 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-12">The Journey Thus Far</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <div key={m.year} className="relative space-y-2">
                <span className="font-hero-big text-3xl sm:text-4xl text-amber-400 font-black block">
                  {m.year}
                </span>
                <h4 className="text-base font-extrabold text-white">{m.title}</h4>
                <p className="text-xs text-stone-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Taste */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Ready to taste the obsession?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-full transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/locations"
              className="px-8 py-4 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-full transition-all border border-white/10"
            >
              <span>Find Our Locations</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
