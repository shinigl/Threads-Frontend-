import React, { useState } from "react";
import { FaHome, FaUserTie, FaPlusCircle, FaBars, FaTimes } from "react-icons/fa"; // Changed FaUserCircle to FaUserTie
import { useSelector, useDispatch } from "react-redux";
import { selectUser, clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePostModal from "./CreatePostModal";
import styles from "./Header.module.css";
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      let data = await res.json();
      if (data.error) {
        toast.error(data.error, { position: "top-center" });
        return;
      }
      toast.success("You have logged out successfully!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => {
          dispatch(clearUser());
          navigate("/auth");
        },
      });
    } catch (err) {
      toast.error("Network error! Please try again.", { position: "top-center" });
    }
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <FaBars className={styles.hamburger} onClick={() => setMenuOpen(true)} />

      {/* Sidebar */}
      <header className={`${styles.header} ${menuOpen ? styles.open : "closed"}`}>
        {/* Close Button */}
        <FaTimes className={styles.closeButton} onClick={() => setMenuOpen(false)} />

        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>

        <div className={styles.icons}>
          <FaHome size={65} className={styles.icon} onClick={() => navigate("/")} />

          {user && (
            <FaPlusCircle
              size={35}
              className={styles.createPostIcon}
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>

        <div className={styles.profileAndLogin}>
          <div className={styles.profileIcon}>
            {user && <span className={styles.userName}>{user.name}</span>}
            <Link to={`/${user.username}`} className={styles.profileLink}>
              <FaUserTie size={50} className={styles.icon} /> {/* Changed to FaUserTie and reduced size */}
            </Link>
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
      </header>

      {/* Create Post Modal */}
      {isModalOpen && <CreatePostModal closeModal={() => setIsModalOpen(false)} />}

      <ToastContainer />
    </>
  );
};

export default Header;