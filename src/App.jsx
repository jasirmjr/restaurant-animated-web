import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { RollsPage } from './pages/RollsPage';
import { BurgersPage } from './pages/BurgersPage';
import { PizzaPage } from './pages/PizzaPage';
import { AboutPage } from './pages/AboutPage';
import { LocationsPage } from './pages/LocationsPage';

// Scroll to top upon route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-black">
          
          {/* Top Sticky Header */}
          <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

          {/* Quick Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* Slide-over Order Bag Drawer */}
          <CartDrawer />

          {/* Main Application Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/rolls" element={<RollsPage />} />
              <Route path="/burgers" element={<BurgersPage />} />
              <Route path="/pizza" element={<PizzaPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* High-end Dark Theme Footer */}
          <Footer />

        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
