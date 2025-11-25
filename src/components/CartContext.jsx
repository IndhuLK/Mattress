import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage on mount (Initialize state directly)
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // ✅ Save to localStorage and trigger event whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.sku === item.sku);
      if (existing) {
        // If already exists, increase quantity
        return prev.map((p) =>
          p.sku === item.sku
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (sku) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
