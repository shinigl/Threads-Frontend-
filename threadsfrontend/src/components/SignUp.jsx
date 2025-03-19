import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Import Redux action
import { showLogin } from "../redux/authSlice";
import styles from "./SignUp.module.css";
import logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch(`/api/users/signup`, {
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

      // Store user in Redux and localStorage
      dispatch(setUser(data));

      // Show success message & then navigation is handled by AppContent's useEffect
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 1000,
        theme : "dark",
      });
      setTimeout(()=>{

        navigate(0);
      },1000)

      
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Network error! Please try again.", { position: "top-right" });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.signupBox}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <p className={styles.tagline}>Join the conversation</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              value={inputs.name}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              value={inputs.username}
              className={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
              className={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              value={inputs.password}
              className={styles.input}
              required
            />

            <button onClick={handleSignUp} type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <span onClick={() => dispatch(showLogin())} className={styles.link}>
              Log in
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
