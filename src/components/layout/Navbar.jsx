import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Flame, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { heroSlides } from '../../data/foodData';

export const Navbar = ({ onOpenSearch }) => {
  const { totalCount, toggleCart, setActiveSlideIndex } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleHeroItemClick = (slideId) => {
    const targetIdx = heroSlides.findIndex((s) => s.id === slideId);
    if (targetIdx > -1) {
      if (!isHome) {
        navigate('/');
        setTimeout(() => {
          setActiveSlideIndex(targetIdx);
          window.dispatchEvent(new CustomEvent('scroll-to-slide', { detail: targetIdx }));
        }, 150);
      } else {
        setActiveSlideIndex(targetIdx);
        window.dispatchEvent(new CustomEvent('scroll-to-slide', { detail: targetIdx }));
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'BURGER', slideId: 'burger', path: '/burgers' },
    { label: 'SHAWARMA', slideId: 'roll', path: '/rolls' },
    { label: 'PIZZA', slideId: 'pizza', path: '/pizza' },
    { label: 'MENU', path: '/menu' },
    { label: 'OUR STORY', path: '/about' },
 
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="glass-nav rounded-2xl sm:rounded-full px-5 sm:px-8 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 text-white font-extrabold tracking-tight group"
            >
            
              <div className="flex flex-col">
               <span className="font-hero-big text-xl sm:text-2xl leading-none tracking-[1.5em] text-white">
                CRAVE<span className="text-amber-300"></span>
              </span>
               
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={item.label} className="relative group">
                    {item.slideId ? (
                      <button
                        onClick={() => handleHeroItemClick(item.slideId)}
                        className={`text-xs uppercase font-extrabold tracking-widest transition-colors py-1 cursor-pointer ${
                          isActive
                            ? 'text-white font-black'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white rounded-full mt-0.5" />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`text-xs uppercase font-extrabold tracking-widest transition-colors py-1 ${
                          isActive
                            ? 'text-white font-black'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white rounded-full mt-0.5" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Icons: Search & Cart with red badge */}
            <div className="flex items-center gap-3 sm:gap-4">
              

              {/* Cart trigger button with red badge counter */}
              <button
                onClick={toggleCart}
                aria-label="View Shopping Cart"
                className="relative w-11 h-11 rounded-full bg-black text-white hover:bg-neutral-900 flex items-center justify-center transition-all duration-200 shadow-md border border-white/20 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                
                {/* Red badge counter matching reference UI */}
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#E11D48] text-white text-[11px] font-black flex items-center justify-center border-2 border-stone-900 shadow-md animate-pulse">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open Mobile Menu"
                className="lg:hidden w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-4 mt-2 p-5 bg-stone-950/95 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 font-semibold">
              {navLinks.map((item) => (
                <div key={item.label} className="border-b border-white/5 pb-2">
                  {item.slideId ? (
                    <button
                      onClick={() => handleHeroItemClick(item.slideId)}
                      className="w-full text-left py-2 px-3 hover:bg-white/10 rounded-lg text-sm tracking-widest uppercase font-extrabold flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 hover:bg-white/10 rounded-lg text-sm tracking-widest uppercase font-extrabold"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
