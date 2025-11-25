import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// import courseSlice from "./features/course/courseSlice";
import authReducer from "./features/auth/authSlice";
import cartReducer from "../redux/features/cart/cart";
export const store = configureStore({
  reducer: {
    // course: courseSlice,
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
