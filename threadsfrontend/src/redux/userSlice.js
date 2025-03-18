import { createSlice } from "@reduxjs/toolkit";

// Load user data from local storage (if available)
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
    clearUser: (state) => {
      localStorage.removeItem("user-threads");
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
