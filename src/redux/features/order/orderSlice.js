import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("order")) || {
  name: "",
  email: "",
  phone: "",
  upozila: "",
  zila: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfo: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("order", JSON.stringify(newState));
      return newState;
    },

    clearOrderInfo: () => {
      localStorage.removeItem("order");
      return {
        name: "",
        email: "",
        phone: "",
        upozila: "",
        zila: "",
      };
    },
  },
});

export const { setOrderInfo, clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
