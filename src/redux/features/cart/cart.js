import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalQty: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.cartItems.find((item) => item._id === product._id);

      if (exist) {
        exist.qty += product.qty;
        toast.success("Product added to cart");
      } else {
        state.cartItems.push({ ...product, qty: product.qty });
        toast.success("Product added to cart");
      }

      state.totalQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.cartItems.reduce(
        (acc, item) =>
          acc + item.qty * Math.ceil(item.discountPrice || item.price),
        0
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item._id === id);

      if (item) {
        toast.warn("Item removed from cart");
      }

      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      state.totalQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.cartItems.reduce(
        (acc, item) =>
          acc + item.qty * Math.ceil(item.discountPrice || item.price),
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;

      const item = state.cartItems.find((item) => item._id === id);
      if (item) {
        item.qty = qty;
      }

      state.totalQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.cartItems.reduce(
        (acc, item) =>
          acc + item.qty * Math.ceil(item.discountPrice || item.price),
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQty } =
  cartSlice.actions;
export default cartSlice.reducer;
