import React from "react";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Header.module.css";
import logo from '../assets/logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.homeIcon}>
        <FaHome size={30} color="#333" className={styles.icon} />
      </div>
      <div className={styles.profileAndLogin}>
        <div className={styles.profileIcon}>
          <FaUserCircle size={30} color="#333" className={styles.icon} />
        </div>
        <button className={styles.loginButton}>Log In</button>
      </div>
    </header>
  );
};

export default Header;
