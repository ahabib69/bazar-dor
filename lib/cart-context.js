"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "bazar-dor-cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartReady, setCartReady] = useState(false);

  // load the saved cart after mount so server render and first client
  // render stay the same (no hydration error)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        if (Array.isArray(items)) {
          setCartItems(items);
        }
      }
    } catch (error) {
      setCartItems([]);
    }
    setCartReady(true);
  }, []);

  // save the cart whenever it changes
  useEffect(() => {
    if (!cartReady) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, cartReady]);

  function addToCart(product) {
    setCartItems((current) => {
      const found = current.find((item) => item.id === product.id);

      // same product again? just increase the quantity, no duplicate row
      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          slug: product.slug,
          nameBn: product.nameBn,
          image: product.image,
          categoryNameBn: product.categoryNameBn,
          unit: product.unit,
          today: product.today,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(id) {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function removeFromCart(id) {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // estimated total from the price saved with each product
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.today * item.quantity,
    0
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    cartReady,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
