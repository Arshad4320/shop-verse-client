import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    token: token ? token : null,
    isAuthenticated: token ? true : false,
  },
  reducers: {
    setCredential: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredential, logOut } = authSlice.actions;
export default authSlice.reducer;
