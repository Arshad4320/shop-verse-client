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
        toast.success("product is added check to cart");
      } else {
        toast.success("product is added check to cart");
        state.cartItems.push({ ...product, qty: product.qty });
      }

      state.totalQty += product.qty;
      state.totalPrice +=
        product.qty * (product.discountPrice || product.price);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item._id === id);

      if (item) {
        toast.warn("remove item from your cart");
        state.totalQty -= item.qty;
        state.totalPrice -= item.qty * (item.discountPrice || item.price);
      }

      state.cartItems = state.cartItems.filter((item) => item._id !== id);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
