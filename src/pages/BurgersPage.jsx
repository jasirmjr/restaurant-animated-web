import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Layers, Flame, Star, Check, Sparkles, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const BurgersPage = () => {
  const { addToCart } = useCart();
  const [pattyType, setPattyType] = useState('double'); // 'single', 'double', 'triple', 'smash'
  const [bunType, setBunType] = useState('Brioche Bun');
  const [cheeseType, setCheeseType] = useState('Aged Cheddar');
  const [isExploded, setIsExploded] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState(['Caramelized Onions', 'Truffle Mayo']);

  const patties = {
    single: { label: 'Single Wagyu (1/4 lb)', price: 11.99, cal: '520 kcal', desc: 'Single prime beef patty with lace crust' },
    double: { label: 'Double Wagyu Smash', price: 14.99, cal: '680 kcal', desc: 'Dual smashed patties for optimal crisp surface area' },
    triple: { label: 'Triple Monster Stack', price: 17.99, cal: '890 kcal', desc: 'Three juicy patties with melted cheese between each layer' },
    smash: { label: 'Super Crisp Lace Smash', price: 13.99, cal: '610 kcal', desc: 'Ultra-thin pressed with blistered crackling edges' },
  };

  const addonsList = [
    { name: 'Applewood Smoked Bacon', price: 1.95 },
    { name: 'Crispy Onion Strings', price: 1.25 },
    { name: 'Caramelized Onions', price: 0.95 },
    { name: 'Truffle Mayo', price: 1.50 },
    { name: 'Pickled Jalapeños', price: 0.75 },
    { name: 'Fried Farm Egg', price: 1.50 },
  ];

  const toggleAddon = (addonName) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((a) => a !== addonName) : [...prev, addonName]
    );
  };

  const currentPatty = patties[pattyType];
  const addonsTotal = selectedAddons.reduce((sum, name) => {
    const found = addonsList.find((a) => a.name === name);
    return sum + (found ? found.price : 0);
  }, 0);
  const totalPrice = currentPatty.price + addonsTotal;

  const handleAddToCart = () => {
    const summary = `${currentPatty.label} • ${bunType} • ${cheeseType} • Addons: [${selectedAddons.join(', ')}]`;
    addToCart({
      id: `custom-burger-${Date.now()}`,
      name: `Custom Smash Burger (${currentPatty.label})`,
      price: totalPrice,
      image: '/images/burger.png',
      category: 'burgers',
    }, 1, { summary });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Layers for 3D exploded view
  const layers = [
    { name: 'Golden Brioche Crown', color: '#D97706', height: 'h-6' },
    { name: 'Black Truffle Umami Mayo', color: '#FEF3C7', height: 'h-2' },
    { name: 'Crispy Butterhead Lettuce', color: '#84CC16', height: 'h-3' },
    { name: 'Vine-Ripened Tomato Slice', color: '#EF4444', height: 'h-3' },
    { name: cheeseType, color: '#F59E0B', height: 'h-3' },
    { name: `${currentPatty.label} (Crisp Edge)`, color: '#78350F', height: 'h-5' },
    ...(pattyType === 'double' || pattyType === 'triple'
      ? [{ name: 'Second Melted Cheese & Wagyu Patty', color: '#78350F', height: 'h-5' }]
      : []),
    ...(pattyType === 'triple'
      ? [{ name: 'Third Wagyu Patty Layer', color: '#78350F', height: 'h-5' }]
      : []),
    { name: 'Caramelized Sweet Shallots', color: '#B45309', height: 'h-2' },
    { name: 'Toasted Heel Brioche Base', color: '#D97706', height: 'h-5' },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Gourmet Patty Atelier
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            The Ultimate Smash Burger
          </h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Seared at 500°F on polished chrome planchas to build maximum Maillard reaction crunch, accompanied by buttery brioche and house emulsions.
          </p>
        </div>

        {/* 2-Column interactive builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Burger Graphic & 3D Layer View Toggle */}
          <div className="lg:col-span-5 sticky top-28 bg-stone-900 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
            
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Visual Architecture
              </span>
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isExploded
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? 'Condensed View' : 'Exploded 3D View'}</span>
              </button>
            </div>

            {/* Display Stage */}
            <div className="relative w-full min-h-[300px] flex items-center justify-center my-6">
              <div className="absolute w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

              {!isExploded ? (
                <motion.div
                  key={pattyType}
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="relative flex items-center justify-center"
                >
                  <img
                    src="/images/burger.png"
                    alt="Smash Burger Preview"
                    className="max-h-56 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
                  />
                </motion.div>
              ) : (
                /* Exploded Stratum Diagram */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-xs flex flex-col items-center gap-2 py-4"
                >
                  {layers.map((l, i) => (
                    <motion.div
                      key={l.name + i}
                      initial={{ y: -10 * i, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      style={{ backgroundColor: l.color }}
                      className={`w-full ${l.height} rounded-xl shadow-lg flex items-center justify-between px-3 text-[11px] font-extrabold text-stone-900 border border-black/20`}
                    >
                      <span className="truncate">{l.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Nutrition specs badge */}
            <div className="w-full bg-stone-950 rounded-2xl p-4 border border-white/5 flex items-center justify-around text-center mb-6">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">Calories</span>
                <span className="text-sm font-extrabold text-amber-400">{currentPatty.cal}</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">Protein</span>
                <span className="text-sm font-extrabold text-white">42g</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">Grade</span>
                <span className="text-sm font-extrabold text-emerald-400">USDA Prime</span>
              </div>
            </div>

            {/* Total and CTA */}
            <div className="w-full flex items-center justify-between gap-4 pt-2">
              <div className="text-left">
                <span className="text-xs text-stone-400 block font-medium">Total Burger</span>
                <span className="text-2xl font-black text-amber-400">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Burger to Bag</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Patty Stack */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">1</span>
                Patty Formation & Weight
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(patties).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setPattyType(key)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      pattyType === key
                        ? 'bg-stone-800 border-amber-400 text-white shadow-md'
                        : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-extrabold text-sm text-white">{data.label}</span>
                      <span className="text-xs text-amber-400 font-extrabold">${data.price.toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 leading-tight">{data.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Artisan Bun */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
                Bakery Bun Selection
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Brioche Bun', 'Potato Roll', 'Sesame Bun', 'Gluten-Free'].map((bun) => (
                  <button
                    key={bun}
                    onClick={() => setBunType(bun)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all text-center border ${
                      bunType === bun
                        ? 'bg-white text-stone-950 font-black border-white shadow-md'
                        : 'bg-stone-950/60 text-stone-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {bun}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Melted Cheese */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">3</span>
                Artisanal Melted Cheese
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Aged Cheddar', 'Smoked Gouda', 'Pepper Jack', 'Truffle Fontina'].map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setCheeseType(ch)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all text-center border ${
                      cheeseType === ch
                        ? 'bg-amber-500 text-stone-950 font-black border-amber-400 shadow-md'
                        : 'bg-stone-950/60 text-stone-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Premium Addons */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">4</span>
                Gourmet Add-ons & Toppings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <button
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
                        isChecked
                          ? 'bg-stone-800 border-amber-400 text-white shadow-md'
                          : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            isChecked ? 'bg-amber-500 text-black' : 'border border-stone-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-white">{addon.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-amber-400">+${addon.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
