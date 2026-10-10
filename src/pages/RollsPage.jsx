import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Check, Plus, ShoppingBag, Info, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const RollsPage = () => {
  const { addToCart } = useCart();

  // Customizer state
  const [wrap, setWrap] = useState('Flaky Paratha');
  const [protein, setProtein] = useState('Charred Tandoori Chicken');
  const [sauces, setSauces] = useState(['Garlic Toum Aioli', 'Mint Yogurt Chutney']);
  const [toppings, setToppings] = useState(['Sumac Red Onions', 'Pickled Turnips']);
  const [spiceLevel, setSpiceLevel] = useState('Medium');

  const wrapOptions = [
    { id: 'Flaky Paratha', label: 'Flaky Laccha Paratha', extra: 0, tag: 'Traditional Flaky' },
    { id: 'Middle-Eastern Saj Bread', label: 'Thin Crisp Saj Bread', extra: 0.50, tag: 'Shawarma Classic' },
    { id: 'Whole Wheat Roti', label: 'Whole Wheat Tawa Roti', extra: 0, tag: 'Light & Wholesome' },
    { id: 'Lettuce Wrap', label: 'Crisp Romaine Butter Wrap', extra: 0.75, tag: 'Keto / Low-Carb' },
  ];

  const proteinOptions = [
    { id: 'Charred Tandoori Chicken', label: 'Flame-Kissed Chicken', price: 10.99, cal: '520 kcal' },
    { id: 'Slow-Turned Spit Shawarma', label: 'Spiced Chicken Shawarma', price: 11.49, cal: '540 kcal' },
    { id: 'Charred Cottage Cheese (Paneer)', label: 'Smoky Malai Paneer Tikka', price: 9.99, cal: '480 kcal' },
    { id: 'Lamb Seekh Kebab', label: 'Spiced Minced Lamb Kebab', price: 12.99, cal: '610 kcal' },
  ];

  const sauceOptions = [
    'Garlic Toum Aioli',
    'Mint Yogurt Chutney',
    'Smoked Harissa Chili',
    'Tahini Lemon Emulsion',
    'Sweet Date & Tamarind Dip',
  ];

  const toppingOptions = [
    'Sumac Red Onions',
    'Pickled Wild Turnips',
    'Thin Salted Crispy Fries',
    'Fresh Pomegranate Seeds',
    'Charred Bell Peppers',
    'Fresh Mint Sprigs',
  ];

  const toggleSauce = (name) => {
    setSauces((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const toggleTopping = (name) => {
    setToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const currentProtein = proteinOptions.find((p) => p.id === protein) || proteinOptions[0];
  const currentWrap = wrapOptions.find((w) => w.id === wrap) || wrapOptions[0];
  const totalPrice = currentProtein.price + currentWrap.extra + (toppings.length > 2 ? (toppings.length - 2) * 0.75 : 0);

  const handleAddToCart = (e) => {
    const summary = `${wrap} • ${protein} • [${sauces.join(', ')}] • [${toppings.join(', ')}] • ${spiceLevel} Heat`;
    addToCart({
      id: `custom-roll-${Date.now()}`,
      name: `Custom Craft Roll (${protein})`,
      price: totalPrice,
      image: '/images/shawarma.png',
      category: 'rolls',
    }, 1, { summary });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-lime-400 font-extrabold text-xs uppercase tracking-widest bg-lime-500/10 px-4 py-1.5 rounded-full border border-lime-500/20 inline-block">
            Bespoke Kathi & Shawarma Craft
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Build Your Ultimate Roll
          </h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Every roll is hand-stretched, grilled over charcoal, and packed with aromatic whole-spice marinades. Tailor each layer to your exact appetite.
          </p>
        </div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Showcase & Real-Time Plate Preview */}
          <div className="lg:col-span-5 sticky top-28 bg-stone-900 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
            
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center my-4">
              {/* Vibrant lime glow circle matching Screen 2 theme */}
              <div className="absolute w-52 h-52 bg-lime-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <motion.img
                key={protein + wrap}
                initial={{ scale: 0.9, rotate: -5, opacity: 0.8 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                src="/images/shawarma.png"
                alt="Shawarma Roll Preview"
                className="max-h-56 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] z-10"
              />
            </div>

            <div className="w-full bg-stone-950/80 rounded-2xl p-5 border border-white/5 text-left space-y-3 mb-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-sm text-white">Configured Roll</span>
                <span className="text-xs text-lime-400 font-bold bg-lime-500/10 px-2.5 py-0.5 rounded-full">
                  {currentProtein.cal}
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-mono">
                <strong className="text-white">Wrap:</strong> {wrap}<br />
                <strong className="text-white">Filling:</strong> {protein}<br />
                <strong className="text-white">Sauces:</strong> {sauces.length > 0 ? sauces.join(', ') : 'None'}<br />
                <strong className="text-white">Toppings:</strong> {toppings.length > 0 ? toppings.join(', ') : 'None'}<br />
                <strong className="text-white">Spice:</strong> {spiceLevel}
              </p>
            </div>

            {/* Price & Add To Cart Button */}
            <div className="w-full flex items-center justify-between gap-4 pt-2">
              <div className="text-left">
                <span className="text-xs text-stone-400 block font-medium">Calculated Price</span>
                <span className="text-2xl font-black text-lime-400">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-full bg-lime-500 hover:bg-lime-400 text-stone-950 font-black tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Roll to Bag</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Wrap Style */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs flex items-center justify-center font-bold">1</span>
                  Choose Your Wrap Base
                </h3>
                <span className="text-xs text-stone-400">Hand-rolled & griddled</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wrapOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setWrap(opt.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      wrap === opt.id
                        ? 'bg-stone-800 border-lime-400 text-white shadow-md'
                        : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-extrabold text-sm text-white">{opt.label}</span>
                      {opt.extra > 0 && <span className="text-xs text-lime-400 font-bold">+${opt.extra.toFixed(2)}</span>}
                    </div>
                    <span className="text-[11px] text-stone-400">{opt.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Main Protein & Fillings */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs flex items-center justify-center font-bold">2</span>
                  Select Signature Protein / Core
                </h3>
                <span className="text-xs text-stone-400">Smoked over aged charcoal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proteinOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setProtein(opt.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      protein === opt.id
                        ? 'bg-stone-800 border-lime-400 text-white shadow-md'
                        : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-extrabold text-sm text-white">{opt.label}</span>
                      <span className="text-xs text-lime-400 font-extrabold">${opt.price.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">{opt.cal}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sauces (Multi-Select) */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs flex items-center justify-center font-bold">3</span>
                  Artisan Sauces & Dips
                </h3>
                <span className="text-xs text-stone-400">Select any 2 or more</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {sauceOptions.map((name) => {
                  const isSelected = sauces.includes(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleSauce(name)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-lime-500 text-stone-950 shadow-md font-extrabold'
                          : 'bg-stone-950/60 text-stone-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Pickles & Crunch (Multi-Select) */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs flex items-center justify-center font-bold">4</span>
                  Extra Pickles & Crunch
                </h3>
                <span className="text-xs text-stone-400">First 2 free, +$0.75 each after</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {toppingOptions.map((name) => {
                  const isSelected = toppings.includes(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleTopping(name)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-white text-stone-950 shadow-md font-extrabold'
                          : 'bg-stone-950/60 text-stone-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Spice Dial */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs flex items-center justify-center font-bold">5</span>
                Heat Level
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {['Mild', 'Medium', 'Fiery', 'Extreme Ghost'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-3 rounded-2xl text-xs font-extrabold transition-all text-center border ${
                      spiceLevel === lvl
                        ? 'bg-amber-500 text-black border-amber-400 shadow-lg'
                        : 'bg-stone-950/60 text-stone-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
