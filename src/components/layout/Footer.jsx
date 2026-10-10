import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, MapPin, Phone, Mail, Instagram, Twitter, Facebook, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 text-white font-extrabold tracking-tight">
             
              <span className="font-hero-big text-2xl tracking-wider text-white">
                CRAVE<span className="text-amber-400"></span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Crafting fire-roasted smash burgers, flaky Indian rolls, and artisanal Neapolitan wood-fired pizza with obsession over farm-fresh ingredients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Menu Specialties</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/burgers" className="hover:text-amber-400 transition-colors">Double Smash Burgers</Link>
              </li>
              <li>
                <Link to="/rolls" className="hover:text-amber-400 transition-colors">Kathi & Shawarma Wraps</Link>
              </li>
              <li>
                <Link to="/pizza" className="hover:text-amber-400 transition-colors">Wood-Fired Pizza</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">Full Food Catalog</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">Party Combos & Sides</Link>
              </li>
            </ul>
          </div>

          {/* Story & Company */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Experience</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">Our Kitchen Philosophy</Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-amber-400 transition-colors">Find Nearest Location</Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-amber-400 transition-colors">Book a Private Table</Link>
              </li>
              <li>
                <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Open Today till 11:30 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">The Secret Sauce Club</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Get secret chef drops, invitation-only tastings, and 20% off your first online order.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold py-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the list! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-stone-900 border border-white/10 rounded-l-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 w-full"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-4 rounded-r-xl flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom micro-row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} CRAVE & CO. Artisanal Food Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#nutrition" className="hover:text-stone-300 transition-colors">Nutritional Guide</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
