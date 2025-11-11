"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "appleNation.cart.v1";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isHydrated]);

  const addItem = useCallback((payload, quantity = 1) => {
    setItems((prev) => {
      const id = payload.variantId ? `${payload.id}:${payload.variantId}` : String(payload.id);
      const existing = prev.find((it) => it.key === id);
      if (existing) {
        return prev.map((it) => (it.key === id ? { ...it, quantity: it.quantity + quantity } : it));
      }
      const newItem = {
        key: id,
        id: payload.id,
        variantId: payload.variantId || null,
        name: payload.name,
        price: Number(payload.price || 0),
        image: payload.image || "/globe.svg",
        attributes: payload.attributes || null,
        quantity: quantity,
      };
      return [newItem, ...prev];
    });
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((it) => it.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      prev.map((it) => (it.key === key ? { ...it, quantity: Math.max(1, Number(quantity) || 1) } : it))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.quantity * it.price, 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, count, subtotal, isHydrated }),
    [items, addItem, removeItem, updateQuantity, clear, count, subtotal, isHydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


