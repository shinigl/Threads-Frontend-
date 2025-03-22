import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const AuthPage = () => {
  const authScreen = useSelector((state) => state.auth.screen); // Get auth state

  return <>{authScreen === "login" ? <Login /> : <SignUp />}</>;
};

export default AuthPage;
