import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showSignUp } from "../redux/authSlice";
import styles from "./Login.module.css";
import logo from "../assets/logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const dispatch = useDispatch(); // Redux dispatch

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <p className={styles.tagline}>Welcome back</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>

          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <span onClick={() => dispatch(showSignUp())} className={styles.link}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
