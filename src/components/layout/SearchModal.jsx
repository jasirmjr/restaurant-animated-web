import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, ArrowRight } from 'lucide-react';
import { menuCatalog } from '../../data/foodData';
import { useCart } from '../../context/CartContext';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const filteredItems = searchTerm.trim()
    ? menuCatalog.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleQuickAdd = (item) => {
    addToCart(item);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-stone-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white z-10 my-8"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <Search className="w-6 h-6 text-amber-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search burgers, kathi rolls, wood-fired pizza..."
                className="w-full bg-transparent text-lg sm:text-xl font-bold placeholder-stone-500 focus:outline-none text-white"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions if empty */}
            {!searchTerm.trim() && (
              <div className="py-4">
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-400 block mb-3">
                  Trending Now:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Truffle Smash Burger', 'Beirut Shawarma', 'Hot Honey Pepperoni', 'Paneer Tikka Roll'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-3.5 py-1.5 rounded-full border border-white/5 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Results */}
            {searchTerm.trim() && (
              <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
                {filteredItems.length === 0 ? (
                  <p className="text-stone-400 text-sm py-8 text-center">
                    No culinary masterpieces found for "{searchTerm}".
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-xl bg-stone-900/80 p-1"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-xs text-stone-400 uppercase tracking-wider">
                            ${item.price.toFixed(2)} • {item.calories}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(item)}
                        className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-transform active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Add</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
