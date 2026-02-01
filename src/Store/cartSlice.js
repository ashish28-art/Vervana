import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const uniqueId = `${product.id}-${product.size}`;
      

      const existingItem = state.items.find(
        (item) => item.uniqueId === uniqueId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          uniqueId,
        });
      }
    },

    removeFromCart(state, action) {
      const uniqueId = action.payload;
      state.items = state.items.filter(
        (item) => item.uniqueId !== uniqueId
      );
    },

    increment(state, action) {
      const uniqueId = action.payload;
      const item = state.items.find(
        (item) => item.uniqueId === uniqueId
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrement(state, action) {
      const uniqueId = action.payload;
      const item = state.items.find(
        (item) => item.uniqueId === uniqueId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
