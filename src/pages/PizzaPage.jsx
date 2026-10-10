import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Flame, Sparkles, Check, Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const PizzaPage = () => {
  const { addToCart } = useCart();

  const [size, setSize] = useState('Medium'); // 'Regular', 'Medium', 'Large'
  const [crust, setCrust] = useState('Neapolitan Thin'); // 'Neapolitan Thin', 'Stuffed Crust', 'Deep Pan'
  const [sauce, setSauce] = useState('San Marzano Tomato');
  const [toppings, setToppings] = useState(['Cup-and-Char Pepperoni', 'Hot Honey Drizzle', 'Fresh Basil']);

  const sizeOptions = [
    { id: 'Regular', label: 'Regular (10")', slices: '6 Slices', basePrice: 14.50, serves: '1-2 People' },
    { id: 'Medium', label: 'Medium (12")', slices: '8 Slices', basePrice: 17.50, serves: '2-3 People' },
    { id: 'Large', label: 'Large (16")', slices: '12 Slices', basePrice: 22.00, serves: '3-4 People' },
  ];

  const crustOptions = [
    { id: 'Neapolitan Thin', label: 'Neapolitan Wood-Fired Thin', extra: 0, tag: 'Blistered & Chewy' },
    { id: 'Stuffed Crust', label: 'Garlic Herb Mozzarella Stuffed', extra: 3.00, tag: 'Melting Core' },
    { id: 'Deep Pan', label: 'Cast-Iron Detroit Deep Pan', extra: 2.00, tag: 'Golden Crispy Edge' },
    { id: 'Cauliflower Gluten-Free', label: 'Organic Cauliflower Crust', extra: 3.50, tag: 'Gluten-Free & Crisp' },
  ];

  const sauceBases = [
    'San Marzano Tomato',
    'Roasted Garlic Crema (Bianca)',
    'Spicy Arrabbiata Chili',
    'Genovese Basil Pesto',
  ];

  const availableToppings = [
    'Cup-and-Char Pepperoni',
    'Hot Honey Drizzle',
    'Fresh Basil Leaves',
    'Stracciatella Burrata',
    'Roasted Shiitake Mushrooms',
    'Caramelized Red Onions',
    'Kalamata Olives',
    'Smoked Spicy Pancetta',
  ];

  const toggleTopping = (name) => {
    setToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const currentSizeObj = sizeOptions.find((s) => s.id === size) || sizeOptions[1];
  const currentCrustObj = crustOptions.find((c) => c.id === crust) || crustOptions[0];
  const extraToppingsCount = Math.max(0, toppings.length - 2);
  const totalPrice = currentSizeObj.basePrice + currentCrustObj.extra + extraToppingsCount * 1.50;

  const handleAddToCart = () => {
    const summary = `${size} • ${crust} • ${sauce} • Toppings: [${toppings.join(', ')}]`;
    addToCart({
      id: `custom-pizza-${Date.now()}`,
      name: `Artisanal Wood-Fired Pizza (${size})`,
      price: totalPrice,
      image: '/images/pizza.png',
      category: 'pizza',
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
          <span className="text-orange-400 font-extrabold text-xs uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 inline-block">
            Artisanal Pizza Hearth
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Craft Your Signature Pizza
          </h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Natural sourdough levain fermented for 48 hours, baked on volcanic hearthstone at 800°F with sweet Italian tomatoes and fresh fior di latte.
          </p>
        </div>

        {/* 2-Column Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Stage */}
          <div className="lg:col-span-5 sticky top-28 bg-stone-900 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
            
            <div className="relative w-full h-64 sm:h-72 flex items-center justify-center my-4">
              {/* Clementine Coral Glow */}
              <div className="absolute w-52 h-52 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

              <motion.img
                key={size + crust}
                initial={{ scale: 0.85, rotate: -15, opacity: 0.8 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                src="/images/pizza.png"
                alt="Wood-Fired Pizza Preview"
                className="max-h-60 w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] z-10"
              />
            </div>

            {/* Spec Box */}
            <div className="w-full bg-stone-950/80 rounded-2xl p-5 border border-white/5 text-left space-y-2 mb-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-bold text-sm text-white">Custom Hearth Spec</span>
                <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                  {currentSizeObj.slices}
                </span>
              </div>
              <p className="text-xs text-stone-300 font-mono leading-relaxed">
                <strong className="text-white">Size:</strong> {size} ({currentSizeObj.serves})<br />
                <strong className="text-white">Crust:</strong> {crust}<br />
                <strong className="text-white">Base:</strong> {sauce}<br />
                <strong className="text-white">Toppings:</strong> {toppings.length > 0 ? toppings.join(', ') : 'Margherita Plain'}
              </p>
            </div>

            {/* Price & Add to Cart */}
            <div className="w-full flex items-center justify-between gap-4 pt-2">
              <div className="text-left">
                <span className="text-xs text-stone-400 block font-medium">Bespoke Total</span>
                <span className="text-2xl font-black text-orange-400">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-full bg-orange-500 hover:bg-orange-400 text-stone-950 font-black tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Pizza to Bag</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customizer Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Sizing Selector */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center font-bold">1</span>
                  Choose Pizza Diameter & Sizing
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizeOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      size === s.id
                        ? 'bg-stone-800 border-orange-400 text-white shadow-md'
                        : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-extrabold text-sm text-white">{s.label}</span>
                      <span className="text-xs text-orange-400 font-extrabold">${s.basePrice.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-stone-400 block">{s.slices} • {s.serves}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Crust Formulation */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center font-bold">2</span>
                  Crust Fermentation & Edge
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crustOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCrust(c.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      crust === c.id
                        ? 'bg-stone-800 border-orange-400 text-white shadow-md'
                        : 'bg-stone-950/60 border-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-extrabold text-sm text-white">{c.label}</span>
                      {c.extra > 0 && <span className="text-xs text-orange-400 font-bold">+${c.extra.toFixed(2)}</span>}
                    </div>
                    <span className="text-[11px] text-stone-400">{c.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sauce Base */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center font-bold">3</span>
                Hearth Base Sauce
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sauceBases.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSauce(b)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all text-center border ${
                      sauce === b
                        ? 'bg-orange-500 text-stone-950 font-black border-orange-400 shadow-md'
                        : 'bg-stone-950/60 text-stone-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Gourmet Artisanal Toppings */}
            <div className="bg-stone-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center font-bold">4</span>
                  Fire-Roasted Toppings
                </h3>
                <span className="text-xs text-stone-400">First 2 free, +$1.50 each extra</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {availableToppings.map((top) => {
                  const isChecked = toppings.includes(top);
                  return (
                    <button
                      key={top}
                      onClick={() => toggleTopping(top)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                        isChecked
                          ? 'bg-white text-stone-950 shadow-md font-extrabold'
                          : 'bg-stone-950/60 text-stone-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{top}</span>
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
