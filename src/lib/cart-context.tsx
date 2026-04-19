"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CartOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionValue: string;
  priceModifier: number;
}

export interface CartItem {
  key: string; // productId + options hash
  productId: string;
  name: string;
  basePrice: number;
  image: string;
  quantity: number;
  selectedOptions: CartOption[];
}

interface CartContext {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "key" | "quantity">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartCtx = createContext<CartContext | null>(null);

function makeKey(productId: string, options: CartOption[]) {
  const optionStr = options
    .map((o) => `${o.groupId}:${o.optionId}`)
    .sort()
    .join("|");
  return `${productId}__${optionStr}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "key" | "quantity">) => {
    const key = makeKey(item.productId, item.selectedOptions);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, key, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.key !== key));
    } else {
      setItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity } : i));
    }
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => {
    const optionExtra = i.selectedOptions.reduce((x, o) => x + o.priceModifier, 0);
    return s + (i.basePrice + optionExtra) * i.quantity;
  }, 0);

  return (
    <CartCtx.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
