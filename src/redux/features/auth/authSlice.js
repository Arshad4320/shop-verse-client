import { createSlice } from "@reduxjs/toolkit";

const getSafeJSON = (key) => {
  try {
    const value = localStorage.getItem(key);

    if (!value || value === "undefined" || value === "null") {
      return null;
    }

    return JSON.parse(value);
  } catch (err) {
    console.error("JSON parse error:", err);
    return null;
  }
};

const token = localStorage.getItem("token");
const user = getSafeJSON("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    token: token || null,
    isAuthenticated: !!token,
  },

  reducers: {
    setCredential: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.token);

      localStorage.setItem("user", JSON.stringify(payload.user || null));
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
