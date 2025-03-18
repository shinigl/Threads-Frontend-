import { createSlice } from "@reduxjs/toolkit";

// Load user from local storage 
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user-threads");
    return storedUser ? JSON.parse(storedUser) : {};
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return {};
  }
};

const initialState = loadUserFromStorage();

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
      return {};
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

// Selector to get user data
export const selectUser = (state) => state.user;

export default userSlice.reducer;
