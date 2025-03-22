import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Auth state
import userReducer from "./userSlice"; // User state

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Auth reducer
    user: userReducer, // User reducer (managing stored user data)
  },
});

export default store;
