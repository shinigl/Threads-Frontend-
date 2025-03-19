import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaRetweet, FaShare } from "react-icons/fa";
import styles from "./Posts.module.css";
import defaultPic from "../assets/defaultUserPic.webp";

const Posts = ({ postId, postedBy, profilePic, text, img, likes, replies }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!postedBy) return; 

        const res = await fetch("/api/users/profile/"+ postedBy);
        const data = await res.json();

        if (!data.error) {
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [postedBy]);

  return (
    <div className={styles.postContainer}>
    <div className={styles.postCard}>
      {/* Post Header */}
      <div className={styles.postHeader}>
        <img
          src={user.profilePic || profilePic || defaultPic}
          alt="User"
          className={styles.profilePic}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {user.username || `User ID: ${postedBy}` || "Unknown User"}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <p className={styles.text}>{text}</p>
      {img && <img src={img} alt="Post" className={styles.image} />}

      {/* Post Footer */}
      <div className={styles.postFooter}>
        <FaHeart className={styles.icon} />
        <FaComment className={styles.icon} />
        <FaRetweet className={styles.icon} />
        <FaShare className={styles.icon} />
      </div>

      {/* Like & Reply Count */}
      <div className={styles.postStats}>
        <span>{replies?.length || 0} replies</span>
        <span>{likes?.length || 0} likes</span>
      </div>
    </div>
    </div>
  );
};

export default Posts;
