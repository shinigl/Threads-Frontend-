import React, { useEffect } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Header.module.css";
import logo from '../assets/logo.svg';

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation hook

  // Handle Logout
  const handleLogout = () => {
    toast.success("You have logged out successfully!", {
      position: "top-right",
      autoClose: 1500, // Delay before redirect
      onClose: () => {
        dispatch(clearUser()); // Remove user from Redux
        navigate("/auth"); // Redirect to login page
      },
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  // Auto-redirect when user logs in
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home after login
    }
  }, [user, navigate]); // Runs whenever user state changes

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.homeIcon} onClick={() => navigate("/")}>
        <FaHome size={30} className={styles.icon} />
      </div>
      <div className={styles.profileAndLogin}>
        <div className={styles.profileIcon}>
          <FaUserCircle size={30} className={styles.icon} />
        </div>
        {user ? (
          <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <button className={`${styles.button} ${styles.loginButton}`} onClick={() => navigate("/auth")}>
            Log In
          </button>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
