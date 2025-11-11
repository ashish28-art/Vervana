import React, { createContext, useState,useEffect } from "react";

// Create the Context
export const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(()=>{
    const savedCart=localStorage.getItem("cartItems")
    return savedCart?JSON.parse(savedCart):[];
  });

  const addToCart = (product) => {
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
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price.replace(/[^0-9.-]+/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(cartItems.filter((item) => item.uniqueId !== uniqueId));
  };
  
  const increment = (uniqueId) => {
    setCartItems(cartItems.map(item =>
      item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  const decrement = (uniqueId) => {
    setCartItems(cartItems.map(item =>
      item.uniqueId === uniqueId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };
  

  useEffect(()=>{
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  })

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
