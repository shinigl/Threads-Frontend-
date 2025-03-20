import React, { useEffect, useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import styles from "./Posts.module.css";
import defaultPic from "../assets/defaultUserPic.webp";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice"; 
import { toast } from "react-toastify";

const Posts = ({ postId, postedBy, profilePic, text, img }) => {
  const user = useSelector(selectUser); 
  const loggedInUserId = user?._id; 

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hover, setHover] = useState(false);
  const [postOwner, setPostOwner] = useState({});
  const [modal, setModal] = useState(false);
  const [replies, setReplies] = useState([]);  
  const [replyText, setReplyText] = useState(""); 

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();

        if (res.ok) {
          setLikesCount(data.likes.length);
          setIsLiked(data.likes.includes(loggedInUserId)); 
          setReplies(data.replies || []); 
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    fetchPostData();
  }, [postId, loggedInUserId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!postedBy) return;
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (!data.error) {
          setPostOwner(data);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [postedBy]);

  const handleLikeUnlike = async () => {
    try {
      const res = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, 
        },
      });

      if (res.ok) {
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        console.error("Failed to update like status");
      }
    } catch (err) {
      console.error("Error liking/unliking post:", err);
    }
  };

  const handleReply = async () => {
    if (!user) return toast.error("You are not logged in");

    try {
      const res = await fetch(`/api/posts/reply/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ text: replyText }), 
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment added!",{
          autoClose:1000
        });
        setReplies((prev) => [...prev, data.reply]);  
        setReplyText(""); 
      } else {
        toast.error(data.message || "Failed to reply");
      }
    } catch (err) {
      toast.error("Failed to reply", { autoClose: 1000 });
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postCard}>
        {/* Post Header */}
        <div className={styles.postHeader}>
          <Link to={`/${postOwner.username}`}>
            <img
              src={postOwner.profilePic || profilePic || defaultPic}
              alt="User"
              className={styles.profilePic}
            />
          </Link>
          <div className={styles.userInfo}>
            <Link className={styles.userNameLink} to={`/${postOwner.username}`}>
              <span className={styles.userName}>{postOwner.username}</span>
            </Link>
            {postOwner.createdAt && (
              <span className={styles.createdOn}>
                {formatDistanceToNow(parseISO(postOwner.createdAt), { addSuffix: true })}
              </span>
            )}
          </div>
        </div>

        {/* Post Content */}
        <p className={styles.text}>{text}</p>
        {img && <img src={img} alt="Post" className={styles.image} />}

        {/* Post Footer */}
        <div className={styles.postFooter}>
          <FaHeart
            className={`${styles.icon} ${isLiked ? styles.liked : ""}`}
            onClick={handleLikeUnlike}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              color: isLiked || hover ? "red" : "gray",
              cursor: "pointer",
              transition: "color 0.2s ease-in-out",
            }}
          />
          <FaComment className={styles.icon} onClick={() => setModal((prev) => !prev)} />
        </div>

        {/* Like & Reply Count */}
        <div className={styles.postStats}>
          <span>{likesCount} likes</span>
        </div>

        {/* Comment Modal */}
        {modal && (
          <div className={styles.commentModal}>
            <input
              type="text"
              value={replyText} 
              placeholder="Write your comment here"
              onChange={(e) => setReplyText(e.target.value)}
              className={styles.commentInput}
            />
            <button onClick={handleReply} className={styles.commentButton}>Comment</button>
            
            {/* Display Replies */}
            <div className={styles.repliesSection}>
              <h4>Comments:</h4>
              {replies.length > 0 ? (
                replies.map((r, index) => (
                  <p key={index} className={styles.replyText}>{r.text}</p>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
