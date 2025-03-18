import React, { useState } from "react";
import styles from "./SignUp.module.css";
import logo from "../assets/logo.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <img className={styles.logo} src= {logo} />
        <p className={styles.tagline}>Join the conversation</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
