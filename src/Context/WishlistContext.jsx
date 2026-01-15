import React, { createContext, useState, useMemo, useCallback } from "react";

export const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

 
  const addToWishlist = useCallback((item) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  
  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({
    wishlistItems,
    addToWishlist,
    removeFromWishlist
  }), [wishlistItems, addToWishlist, removeFromWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
