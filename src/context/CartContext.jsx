import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_CART = [
  {
    id: 'b1-default',
    catalogId: 'b1',
    name: 'Truffle Smash Burger',
    category: 'burgers',
    price: 13.99,
    quantity: 1,
    image: '/images/burger.png',
    optionsText: 'Double Patty, House Truffle Aioli',
  },
  {
    id: 'r2-default',
    catalogId: 'r2',
    name: 'Beirut Garlic Shawarma Wrap',
    category: 'rolls',
    price: 11.49,
    quantity: 1,
    image: '/images/shawarma.png',
    optionsText: 'Flaky Paratha, Extra Garlic Toum',
  },
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('crave_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    return INITIAL_CART;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('crave_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * (item.quantity || 1));
  }, 0);

  const deliveryFee = subtotal > 35 || subtotal === 0 ? 0 : 3.99;
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal + deliveryFee + tax;

  const addToCart = (product, quantity = 1, options = null) => {
    setCartItems(prev => {
      const customKey = options ? JSON.stringify(options) : '';
      const existingIndex = prev.findIndex(item => 
        (item.catalogId || item.id) === (product.catalogId || product.id) &&
        (item.optionsText || '') === (options?.summary || '')
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const newItem = {
        id: `${product.id}-${Date.now()}`,
        catalogId: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image,
        quantity,
        category: product.category,
        optionsText: options?.summary || 'Standard Fresh Prep',
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        subtotal,
        deliveryFee,
        tax,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        activeSlideIndex,
        setActiveSlideIndex,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
