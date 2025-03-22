import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Import Redux action
import { showSignUp } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../assets/logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log(data);


      if (data.error) {
        toast.error(data.error, { position: "top-right" });
        return;
      }

      // Store user in Redux
      dispatch(setUser(data));
     
      localStorage.setItem("user-threads", JSON.stringify(data));


      toast.success("Login successful! Redirecting to Home page", {
        position: "top-right",
        autoClose: 500,
      });

      setTimeout(()=>{

        navigate(0);
      },1000)

    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Network error! Please try again.", { position: "top-right" });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <p className={styles.tagline}>Welcome back</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={inputs.username}
              className={styles.input}
              required
            />
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={inputs.password}
                className={styles.input}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button onClick={handleLogin} type="submit" className={styles.loginButton}>
              Log In
            </button>
          </form>

          <p className={styles.signupText}>
            Don't have an account?{" "}
            <span onClick={() => dispatch(showSignUp())} className={styles.link}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
