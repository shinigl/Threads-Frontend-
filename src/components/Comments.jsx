import React, { useState } from "react";
import { FaHeart, FaRetweet, FaShare, FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import styles from "./Comments.module.css";
import profilePic from "../assets/pfp.png"; // Replace with actual profile picture

const Comments = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  
  return (
    <div className={styles.commentContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <span className={styles.username}>shin</span>
        </div>
        <div className={styles.timeCont}>
          <span className={styles.time}>2d</span>
          <BsThreeDots className={styles.icon} />
        </div>
      </div>

      <p className={styles.commentText}>I love this post! Looks really cool.</p>

      <div className={styles.actions}>
        <FaHeart 
          className={`${styles.icon} ${liked ? styles.liked : ""}`} 
          onClick={toggleLike} 
        />
        <FaComment className={styles.icon} />
        <FaRetweet className={styles.icon} />
        <FaShare className={styles.icon} />
      </div>

      <div className={styles.footer}>
        <span className={styles.likes}>{liked ? "13 likes" : "12 likes"}</span>
      </div>
      <div className={styles.separation}></div>
      
    </div>
  );
};

export default Comments;
