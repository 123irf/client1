"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  discount: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kidzofi_cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("kidzofi_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  function addToCart(product: Omit<CartItem, "qty">) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQty(id: string, qty: number) {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const discounted = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + discounted * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
