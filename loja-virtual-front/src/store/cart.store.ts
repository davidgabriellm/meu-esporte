// src/hooks/cart/useCartStore.ts
import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description?: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      const updated = existing
        ? state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.cart, item];

      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updated = state.cart.filter((i) => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const updated = state.cart.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    return { cart: [] };
  },

  getTotalPrice: () =>
    get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
