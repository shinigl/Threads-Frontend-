import React, { useState } from 'react'
import styles from './PostPage.module.css'
import { Link } from "react-router-dom";
import { FaHeart, FaComment, FaShare, FaRetweet} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import profilePic from "../assets/pfp.png"; 
import Comments from '../components/Comments';

const PostPage = (props) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <span className={styles.username}>Aniket Kumar</span>
          <span className={styles.verified}>✔</span>
        </div>
        <div className={styles.timeCont}>
          <span className={styles.time}>1d</span>
          <BsThreeDots className={styles.icon} />
        </div>
      </div>

      <p className={styles.caption}>{props.postTitle}</p>

      <Link to={"/ani/post/1"} className={styles.postImageContainer}>
        <img src={profilePic} alt="Post" className={styles.postImage} />
      </Link>

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
        <span className={styles.replies}>{150} replies</span>
        <span className={styles.likes}>{200 + (liked ? 1 : 0)} likes</span>
      </div>
      <div className={styles.separation}></div>
      <Comments/>
      <Comments/>
      <Comments/>
    </div>
  )
}

export default PostPage