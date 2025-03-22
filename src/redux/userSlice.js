import { createSlice } from "@reduxjs/toolkit";

// Load user from local storage (if present)
const storedUser = localStorage.getItem("user-threads");
const initialState = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user-threads", JSON.stringify(action.payload));
      return action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload }; // Merge old & new data
      localStorage.setItem("user-threads", JSON.stringify(updatedUser));
      return updatedUser;
    },
    clearUser: () => {
      localStorage.removeItem("user-threads");
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { setUser, clearUser ,updateUser} = userSlice.actions;

// Selector to get user data
export const selectUser = (state) => state.user;

export default userSlice.reducer;