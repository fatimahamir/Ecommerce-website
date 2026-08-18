// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem("cart");
    if (serialized === null) return { items: [], saved: [] };
    return JSON.parse(serialized);
  } catch (err) {
    return { items: [], saved: [] };
  }
};

const saveCartToStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
      saveCartToStorage(state);
    },
    updateQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty = Math.max(1, action.payload.qty);
      saveCartToStorage(state);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCartToStorage(state);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state);
    },
    saveForLater(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.saved.push(item);
        state.items = state.items.filter((i) => i.id !== action.payload);
        saveCartToStorage(state);
      }
    },
    moveToCart(state, action) {
      const item = state.saved.find((i) => i.id === action.payload);
      if (item) {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) existing.qty += item.qty;
        else state.items.push(item);
        state.saved = state.saved.filter((i) => i.id !== action.payload);
        saveCartToStorage(state);
      }
    },
    removeSaved(state, action) {
      state.saved = state.saved.filter((i) => i.id !== action.payload);
      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart, updateQty, removeFromCart, clearCart,
  saveForLater, moveToCart, removeSaved,
} = cartSlice.actions;
export default cartSlice.reducer;