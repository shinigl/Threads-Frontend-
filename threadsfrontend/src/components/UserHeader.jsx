import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { BsThreeDots, BsArrowLeft } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./UserHeader.module.css";
import defaultPic from "../assets/defaultUserPic.webp";
import logo from "../assets/logo.svg";
import UserPost from "./UserPost";
import { selectUser } from "../redux/userSlice";

// ✅ Loader Component (Framer Motion)
const Loader = () => {
  return (
    <motion.div 
      className={styles.loader}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div 
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className={styles.loadingText}>Loading Profile...</p>
    </motion.div>
  );
};

const UserHeader = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [following, setFollowing] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(true); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      if (!username) return;

      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          toast.error(data.error, { position: "top-center", autoClose: 500 });
          setTimeout(() => navigate("/error"), 500);
          return;
        }

        setUser(data);
        setFollowing(data.followers.includes(currentUser?._id));
      } catch (err) {
        toast.error("Failed to load user profile!");
        setTimeout(() => navigate("/error"), 2000);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, navigate, currentUser]);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
        toast.error("You need to log in first!");
        return;
    }

    //Optimistically update UI before waiting for backend
    setFollowing((prevFollowing) => !prevFollowing);
    const originalState = following; // Store original state in case of error

    try {
        const res = await fetch(`/api/users/follow/${user._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id }), 
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Something went wrong!');
        }

        // toast.success(following ? 'Unfollowed!' : 'Followed!', { autoClose: 500 });
    } catch (err) {
        setFollowing(originalState); // Revert if an error occurs
        toast.error('Error updating follow status.');
    }
};



  if (loading) return <Loader />; 

  return (
    <>
      {/* ✅ Header Section */}
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <BsArrowLeft className={styles.backButton} onClick={() => navigate(-1)} />
      </div>

      {/* ✅ Main Container */}
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.info}>
            <h2 className={styles.name}>{user.name}</h2>
            <p className={styles.username}>@{user.username}</p>
            <p className={styles.bio}>{user.bio}</p>
            <p className={styles.followers}>{user.followers.length || 0} followers</p>
          </div>
          <div className={styles.imgCont}>
            <img src={user.profilePic || defaultPic} alt="Profile" className={styles.avatar} />
          </div>
        </div>

        <div className={styles.icons}>
          <FaInstagram className={styles.icon} />
          <div className={styles.dropdownContainer} ref={dropdownRef}>
            <BsThreeDots onClick={() => setDropDown(!dropDown)} className={styles.icon} />
            {dropDown && (
              <div className={styles.dropMenu}>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  Copy profile link
                </button>
              </div>
            )}
          </div>
        </div>

        {currentUser?.username === user.username ? (
          <button className={styles.editButton} onClick={() => navigate("/update")}>
            Update Profile
          </button>
        ) : (
          <button className={styles.followButton} onClick={handleFollowUnfollow}>
            {following ? "Unfollow" : "Follow"}
          </button>
        )}

        <div className={styles.threadsContainer}>
          <div className={styles.threads}>
            <p>Threads</p>
            <div className={styles.threadsLine}></div>
          </div>
          <div className={styles.replies}>
            <p>Replies</p>
            <div className={styles.replyLine}></div>
          </div>
        </div>

        <div className={styles.usersPost}>
          <UserPost likes={1200} replies={102} postImg={defaultPic} postTitle="At the beach!" />
          <UserPost likes={3200} replies={402} postImg={defaultPic} postTitle="Suit karda!" />
          <UserPost likes={12020} replies={2022} postImg={defaultPic} postTitle="Into the woods!" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserHeader;
