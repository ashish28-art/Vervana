import React, { createContext, useState } from "react";

export const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

 
  const addToWishlist = (item) => {
    setWishlistItems((prev) => [...prev, item]);
  };

  
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
