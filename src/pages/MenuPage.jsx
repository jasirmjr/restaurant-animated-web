import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Leaf, Plus, Check, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { menuCatalog } from '../data/foodData';
import { useCart } from '../context/CartContext';

export const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg', 'spicy'
  const [sortBy, setSortBy] = useState('popular');
  const [addedItem, setAddedItem] = useState(null);

  const { addToCart } = useCart();

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'burgers', label: 'Smash Burgers' },
    { id: 'rolls', label: 'Kathi & Rolls' },
    { id: 'pizza', label: 'Wood-Fired Pizza' },
    { id: 'combos', label: 'Combos' },
    { id: 'drinks', label: 'Craft Drinks' },
  ];

  // Filtering
  const filtered = menuCatalog.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDiet = true;
    if (dietFilter === 'veg') matchesDiet = item.isVeg === true;
    if (dietFilter === 'non-veg') matchesDiet = item.isVeg === false;
    if (dietFilter === 'spicy') matchesDiet = item.isSpicy === true;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default popular
  });

  const handleAdd = (item) => {
    addToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Full Craft Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Explore All Creations
          </h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Every dish is made from scratch using local organic produce, premium cuts, and unhurried artisanal fermentation.
          </p>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-stone-900/80 border border-white/10 rounded-3xl p-6 mb-10 shadow-xl space-y-5">
          {/* Top row: search + sort */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ingredient, flavor, or dish name..."
                className="w-full bg-stone-950 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-400 w-full md:w-auto cursor-pointer"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Category Pills & Dietary Toggles */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-white/5">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-stone-950 text-stone-400 hover:text-white border border-white/5'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Dietary filters */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  dietFilter === 'all' ? 'bg-white/20 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  dietFilter === 'veg' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-stone-400 hover:text-emerald-300'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian</span>
              </button>
              <button
                onClick={() => setDietFilter('spicy')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  dietFilter === 'spicy' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-stone-400 hover:text-red-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Spicy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sorted.length === 0 ? (
              <div className="col-span-full py-16 text-center text-stone-400 space-y-3">
                <p className="text-lg font-bold text-white">No dishes found</p>
                <p className="text-sm">Try relaxing your search terms or dietary filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setDietFilter('all');
                  }}
                  className="px-5 py-2 bg-stone-800 text-stone-200 rounded-full text-xs font-bold hover:bg-stone-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              sorted.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-stone-900 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white">
                        {item.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="relative h-44 w-full flex items-center justify-center my-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-36 w-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition-colors mb-1">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-2 mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-500 block leading-tight">{item.calories}</span>
                      <span className="text-lg font-black text-white">${item.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      aria-label={`Add ${item.name} to order`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        addedItem === item.id
                          ? 'bg-emerald-500 text-black scale-105'
                          : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {addedItem === item.id ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};
