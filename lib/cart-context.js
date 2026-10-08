"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

// simple key
const CART_KEY = "bazar-dor-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // load after mount (hydration safe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (err) {
      console.warn("cart load failed, starting empty", err);
      setItems([]);
    }
    setReady(true);
  }, []);

  // save whenever items change
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + 1,
                justAdded: true,
                addedAt: Date.now(),
              }
            : p
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          nameBn: product.nameBn,
          image: product.image,
          categoryNameBn: product.categoryNameBn,
          unit: product.unit,
          today: product.today,
          quantity: 1,
          justAdded: true,
          addedAt: Date.now(),
        },
      ];
    });

    // 2.5 second পর highlight সরাও
    setTimeout(() => {
      setItems((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, justAdded: false } : p
        )
      );
    }, 2500);
  }

  function increaseQuantity(id) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              justAdded: true,
              addedAt: Date.now(),
            }
          : p
      )
    );

    setTimeout(() => {
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, justAdded: false } : p))
      );
    }, 2500);
  }

  function decreaseQuantity(id) {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.quantity <= 1) return p;
        return { ...p, quantity: p.quantity - 1 };
      })
    );
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  const cartCount = items.reduce((acc, p) => acc + p.quantity, 0);

  const cartTotal = items.reduce(
    (acc, p) => acc + p.today * p.quantity,
    0
  );

  const value = {
    cartItems: items,
    cartCount,
    cartTotal,
    cartReady: ready,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}