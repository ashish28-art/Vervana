import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";

// Create the Context
export const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(()=>{
    const savedCart=localStorage.getItem("cartItems")
    return savedCart?JSON.parse(savedCart):[];
  });

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      // Create a unique key for each size
      const uniqueId = `${product.id}-${product.size}`;
      const existingItem = prevItems.find((i) => i.uniqueId === uniqueId);
  
      if (existingItem) {
        return prevItems.map((i) =>
          i.uniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, uniqueId }];
      }
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price);
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const removeFromCart = useCallback((uniqueId) => {
    setCartItems(prevItems => prevItems.filter((item) => item.uniqueId !== uniqueId));
  }, []);
  
  const increment = useCallback((uniqueId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }, []);
  
  const decrement = useCallback((uniqueId) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.uniqueId === uniqueId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        clearCart,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
