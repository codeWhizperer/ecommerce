"use client"
import  { createContext, useContext, useState, ReactNode } from "react";

// interface CartItem {
//   id: number;
//   name: string;
//   quantity?: number;
// }

// interface CartContextType {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   clearCart: () => void;
//   showCart:boolean;
//   toggleShowCart: () => void;
// }

interface CartProviderProps {
  children: ReactNode;
}

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: CartProviderProps) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//    const [showCart, setShowCart] = useState(false);
//     const toggleShowCart = () => {
//       setShowCart(!showCart);
//     };

//   const addToCart = (item: CartItem) => {
//     setCartItems((prev) => [...prev, item]);
//   };

//   const clearCart = () => setCartItems([]);

//    const [count, setCount] = useState(0)
  
//     const increment = () =>{
//       setCount((prev) =>prev + 1)
//     }
  
//     const decrement = () => {
//       if(count == 0)return;
//       setCount((prev) => prev - 1);
//     }

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, clearCart, toggleShowCart, showCart, increment, decrement, count }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook for using the context
// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };


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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const toggleShowCart = () => setShowCart(!showCart);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        toggleShowCart, 
        showCart, 
        totalItems,
        totalPrice
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