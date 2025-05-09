"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  showCart: boolean;
  toggleShowCart: () => void;
  totalItems: number;
  totalPrice: number;
  quantity: number;
  increment: () => void;
  decrement: () => void;
  setQuantity: (quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  const toggleShowCart = () => setShowCart(!showCart);

  const addToCart = (
    item: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        quantity,
        increment,
        decrement,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        toggleShowCart,
        setQuantity,
        showCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
