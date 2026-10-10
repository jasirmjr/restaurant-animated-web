import React, { useState } from 'react';
import { Plus, Check, ArrowRight, Eye, Film } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const MenuShowcase = () => {
  const [addedItem, setAddedItem] = useState(null);
  const { addToCart } = useCart();

  // Exactly our three core signature products
  const signatureThree = [
    {
      id: 'burger-signature',
      catalogId: 'b1',
      name: 'Truffle Smash Burger',
      category: 'burgers',
      price: 199,
      image: '/images/burger.png',
      rating: 4.9,
      calories: '680 kcal',
      prepTime: '8-10 mins',
      desc: 'Double wagyu smash patty, aged cheddar, caramelized shallots, and shaved black truffle aioli on toasted brioche.',
      badge: "Chef's Choice",
      link: '/burgers',
    },
    {
      id: 'shawarma-signature',
      catalogId: 'r1',
      name: 'Beirut Flame Shawarma',
      category: 'rolls',
      price: 149,
      image: '/images/shawarma.png',
      rating: 4.8,
      calories: '520 kcal',
      prepTime: '6-8 mins',
      desc: 'Flame-kissed seasoned chicken wrapped in hand-rolled flaky paratha with garlic toum aioli and pickled wild turnips.',
      badge: 'Street Legend',
      link: '/rolls',
    },
    {
      id: 'pizza-signature',
      catalogId: 'p1',
      name: 'Wood-Fired Neapolitan Pizza',
      category: 'pizza',
      price: 149,
      image: '/images/pizza.png',
      rating: 5.0,
      calories: '790 kcal',
      prepTime: '12-14 mins',
      desc: '48-hour cold fermented crust, crushed San Marzano tomatoes, fresh fior di latte mozzarella, and wild hot honey drizzle.',
      badge: 'Artisanal Hearth',
      link: '/pizza',
    },
  ];

  const handleAdd = (item) => {
    addToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const scrollToDissection = () => {
    const el = document.getElementById('burger-dissection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="signature-menu-section" className="py-24 bg-stone-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Our Signature Menu
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-white hover:text-amber-400 font-bold text-sm tracking-wide group transition-colors"
          >
            <span>View Complete Menu Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Core Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          {signatureThree.map((item) => {
            const isBurger = item.id === 'burger-signature';
            return (
              <div
                key={item.id}
                className="bg-stone-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 group shadow-2xl relative overflow-hidden"
              >
                <div>
                  {/* Top indicator for Burger */}
                  

                  {/* Food Image */}
                  <div
                    onClick={isBurger ? scrollToDissection : undefined}
                    className={`relative h-56 w-full flex items-center justify-center my-4 overflow-hidden block ${
                      isBurger ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="block group-hover:text-amber-400 transition-colors">
                    <h3 className="font-extrabold text-xl text-white mb-2">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-white">{item.price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    

                    <button
                      onClick={() => handleAdd(item)}
                      aria-label={`Add ${item.name} to order`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        addedItem === item.id
                          ? 'bg-emerald-500 text-black scale-105'
                          : 'bg-white text-black active:scale-95 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {addedItem === item.id ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
