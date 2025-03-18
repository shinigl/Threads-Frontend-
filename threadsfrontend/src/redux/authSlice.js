import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { screen: "login" }, // Default screen is login
  reducers: {
    showLogin: (state) => { state.screen = "login"; },
    showSignUp: (state) => { state.screen = "signup"; },
  },
});

export const { showLogin, showSignUp } = authSlice.actions;
export default authSlice.reducer;
