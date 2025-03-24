// import React, { useEffect, useState } from "react";
// import { FaHeart, FaComment, FaTrash } from "react-icons/fa";
// import styles from "./Posts.module.css";
// import defaultPic from "../assets/defaultUserPic.webp";
// import { Link, useNavigate } from "react-router-dom";
// import { formatDistanceToNow, parseISO } from "date-fns";
// import { useSelector } from "react-redux";
// import { selectUser } from "../redux/userSlice";
// import { toast } from "react-toastify";

// const Posts = ({ postId, postedBy, profilePic, text, img }) => {
//   const user = useSelector(selectUser);
//   const loggedInUserId = user?._id;
//   const navigate = useNavigate();

//   const [isLiked, setIsLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);
//   const [hover, setHover] = useState(false);
//   const [postOwner, setPostOwner] = useState({});
//   const [modal, setModal] = useState(false);
//   const [replies, setReplies] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [deleteCommentModal, setDeleteCommentModal] = useState(null);
//   const apiUrl = import.meta.env.VITE_API_URL || "https://threads-backend-1-so4b.onrender.com";
//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/api/posts/${postId}`);
//         const data = await res.json();

//         if (res.ok) {
//           setLikesCount(data.likes.length);
//           setIsLiked(data.likes.includes(loggedInUserId));
//           setReplies(data.replies || []);
//         }
//       } catch (err) {
//         console.error("Error fetching post data:", err);
//       }
//     };

//     fetchPostData();
//   }, [postId, loggedInUserId]);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         if (!postedBy) return;
//         const res = await fetch(`${apiUrl}/api/users/profile/` + postedBy);
//         const data = await res.json();
//         if (!data.error) {
//           setPostOwner(data);
//         }
//       } catch (err) {
//         console.error("Error fetching user details:", err);
//       }
//     };

//     fetchUserDetails();
//   }, [postedBy]);

//   const handleLikeUnlike = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/posts/like/${postId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       if (res.ok) {
//         setIsLiked((prev) => !prev);
//         setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
//       } else {
//         console.error("Failed to update like status");
//       }
//     } catch (err) {
//       console.error("Error liking/unliking post:", err);
//     }
//   };

//   const handleReply = async () => {
//     if (!user) return toast.error("You are not logged in");

//     try {
//       const res = await fetch(`${apiUrl}/api/posts/reply/${postId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user?.token}`,
//         },
//         body: JSON.stringify({ text: replyText }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Comment added!");
//         setReplies((prev) => [...prev, data.reply]);
//         setReplyText("");
//       } else {
//         toast.error(data.message || "Failed to reply");
//       }
//     } catch (err) {
//       toast.error("Failed to reply", { autoClose: 1000 });
//     }
//   };

//   const handleDeletePost = async () => {
//     try {
//       setDeleteModal(false);
//       const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       if (res.ok) {
//         toast.success("Post deleted successfully!", {
//           autoClose: 500,
//         });
//         setTimeout(() => {
//           navigate(0);
//         }, 1000);
//       } else {
//         toast.error("Failed to delete post");
//       }
//     } catch (err) {
//       toast.error("Error deleting post");
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const res = await fetch(`${apiUrl}/api/posts/reply/${postId}/${commentId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });

//       if (res.ok) {
//         toast.success("Comment deleted successfully!", { autoClose: 500 });
//         setReplies((prev) => prev.filter((reply) => reply._id !== commentId));
//         setDeleteCommentModal(null);
//       } else {
//         toast.error("Failed to delete comment");
//       }
//     } catch (err) {
//       toast.error("Error deleting comment");
//     }
//   };

//   return (
//     <div className={styles.postContainer}>
//       <div className={styles.postCard}>
//         {/* Post Header */}
//         <div className={styles.postHeader}>
//           <Link to={`/${postOwner.username}`}>
//             <img
//               src={postOwner.profilePic || profilePic || defaultPic}
//               alt="User"
//               className={styles.profilePic}
//             />
//           </Link>
//           <div className={styles.userInfo}>
//             <Link className={styles.userNameLink} to={`/${postOwner.username}`}>
//               <span className={styles.userName}>{postOwner.username}</span>
//             </Link>
//             {postOwner.createdAt && (
//               <span className={styles.createdOn}>
//                 {formatDistanceToNow(parseISO(postOwner.createdAt), {
//                   addSuffix: true,
//                 })}
//               </span>
//             )}
//           </div>

//           {loggedInUserId === postedBy && (
//             <FaTrash
//               className={styles.deleteIcon}
//               onClick={() => setDeleteModal(true)}
//               style={{ cursor: "pointer", color: "red" }}
//             />
//           )}
//         </div>

//         {/* Post Content */}
//         <p className={styles.text}>{text}</p>
//         {img && <img src={img} alt="Post" className={styles.image} />}

//         {/* Post Footer */}
//         <div className={styles.postFooter}>
//           <FaHeart
//             className={`${styles.icon} ${isLiked ? styles.liked : ""}`}
//             onClick={handleLikeUnlike}
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//             style={{
//               color: isLiked || hover ? "red" : "gray",
//               cursor: "pointer",
//               transition: "color 0.2s ease-in-out",
//             }}
//           />
//           <FaComment
//             className={styles.icon}
//             onClick={() => setModal((prev) => !prev)}
//           />
//         </div>

//         {/* Like & Reply Count */}
//         <div className={styles.postStats}>
//           <span>{likesCount} likes</span>
//         </div>

//         {/* Comment Modal */}
//         {modal && (
//           <div className={styles.commentModal}>
//             <input
//               type="text"
//               value={replyText}
//               placeholder="Write your comment here"
//               onChange={(e) => setReplyText(e.target.value)}
//               className={styles.commentInput}
//             />
//             <button onClick={handleReply} className={styles.commentButton}>
//               Comment
//             </button>

//             {/* Display Replies */}
//             <div className={styles.repliesSection}>
//               {replies.length > 0 ? (
//                 replies.map((r, index) => (
//                   <div key={index} className={styles.replyContainer}>
//                     <Link to={`/${r.username || "#"}`}>
//                       <img
//                         src={r.userProfilePic || defaultPic}
//                         alt={r.username || "User"}
//                         className={styles.replyProfilePic}
//                       />
//                     </Link>
//                     <div className={styles.replyContent}>
//                       <div className={styles.replyHeader}>
//                         <Link
//                           to={`/${r.username || "#"}`}
//                           className={styles.replyUserName}
//                         >
//                           {r.username || "Unknown User"}
//                         </Link>
//                         {loggedInUserId === r.userId && (
//                           <FaTrash
//                             className={styles.deleteCommentIcon}
//                             onClick={() => setDeleteCommentModal(r._id)}
//                           />
//                         )}
//                       </div>
//                       <p className={styles.replyText}>{r.text}</p>
//                       {r.createdAt ? (
//                         <span className={styles.replyTimestamp}>
//                           {formatDistanceToNow(parseISO(r.createdAt), {
//                             addSuffix: true,
//                           })}
//                         </span>
//                       ) : (
//                         <span className={styles.replyTimestamp}>Just now</span>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No comments yet</p>
//               )}
//             </div>
//           </div>
//         )}

//         {deleteModal && (
//           <div className={styles.modalOverlay}>
//             <div className={styles.modal}>
//               <p>Are you sure you want to delete this post?</p>
//               <button
//                 onClick={handleDeletePost}
//                 className={styles.deleteButton}
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setDeleteModal(false)}
//                 className={styles.cancelButton}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         )}

//         {deleteCommentModal && (
//           <div className={styles.modalOverlay}>
//             <div className={styles.modal}>
//               <p>Are you sure you want to delete this comment?</p>
//               <button
//                 onClick={() => handleDeleteComment(deleteCommentModal)}
//                 className={styles.deleteButton}
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setDeleteCommentModal(null)}
//                 className={styles.cancelButton}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Posts;


import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaTrash } from "react-icons/fa";
import styles from "./Posts.module.css";
import defaultPic from "../assets/defaultUserPic.webp";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Posts = ({ postId, postedBy, profilePic, text, img }) => {
  const user = useSelector(selectUser);
  const loggedInUserId = user?._id;
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hover, setHover] = useState(false);
  const [postOwner, setPostOwner] = useState({});
  const [modal, setModal] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentModal, setDeleteCommentModal] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "https://threads-backend-1-so4b.onrender.com";

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
          method: "GET",
          credentials: "include", // Send jwt cookie
        });
        const data = await res.json();

        if (res.ok) {
          setLikesCount(data.likes.length);
          setIsLiked(data.likes.includes(loggedInUserId));
          setReplies(data.replies || []);
        } else {
          console.error("Failed to fetch post data:", data.message);
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
        const res = await fetch(`${apiUrl}/api/users/profile/${postedBy}`, {
          method: "GET",
          credentials: "include", // Send jwt cookie
        });
        const data = await res.json();
        if (!data.error && !data.message) {
          setPostOwner(data);
        } else {
          console.error("Failed to fetch user details:", data.error || data.message);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [postedBy]);

  const handleLikeUnlike = async () => {
    if (!user) return toast.error("You are not logged in");

    try {
      const res = await fetch(`${apiUrl}/api/posts/like/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send jwt cookie
      });

      const data = await res.json();

      if (res.ok) {
        setIsLiked((prev) => !prev);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        toast.error(data.message || "Failed to update like status");
      }
    } catch (err) {
      toast.error("Error liking/unliking post");
    }
  };

  const handleReply = async () => {
    if (!user) return toast.error("You are not logged in");

    try {
      const res = await fetch(`${apiUrl}/api/posts/reply/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send jwt cookie
        body: JSON.stringify({ text: replyText }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment added!",{
          autoClose:500
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

  const handleDeletePost = async () => {
    if (!user) return toast.error("You are not logged in");

    try {
      setDeleteModal(false);
      const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include", // Send jwt cookie
      });

      if (res.ok) {
        toast.success("Post deleted successfully!", { autoClose: 500 });
        setTimeout(() => {
          navigate(0); // Refresh page
        }, 1000);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete post");
      }
    } catch (err) {
      toast.error("Error deleting post");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return toast.error("You are not logged in");

    try {
      const res = await fetch(`${apiUrl}/api/posts/reply/${postId}/${commentId}`, {
        method: "DELETE",
        credentials: "include", // Send jwt cookie
      });

      if (res.ok) {
        toast.success("Comment deleted successfully!", { autoClose: 500 });
        setReplies((prev) => prev.filter((reply) => reply._id !== commentId));
        setDeleteCommentModal(null);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (err) {
      toast.error("Error deleting comment");
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
              <span className={styles.userName}>{postOwner.username || "Unknown"}</span>
            </Link>
            {postOwner.createdAt && (
              <span className={styles.createdOn}>
                {formatDistanceToNow(parseISO(postOwner.createdAt), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>

          {loggedInUserId === postedBy && (
            <FaTrash
              className={styles.deleteIcon}
              onClick={() => setDeleteModal(true)}
              style={{ cursor: "pointer", color: "red" }}
            />
          )}
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
          <FaComment
            className={styles.icon}
            onClick={() => setModal((prev) => !prev)}
          />
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
            <button onClick={handleReply} className={styles.commentButton}>
              Comment
            </button>

            {/* Display Replies */}
            <div className={styles.repliesSection}>
              {replies.length > 0 ? (
                replies.map((r, index) => (
                  <div key={index} className={styles.replyContainer}>
                    <Link to={`/${r.username || "#"}`}>
                      <img
                        src={r.userProfilePic || defaultPic}
                        alt={r.username || "User"}
                        className={styles.replyProfilePic}
                      />
                    </Link>
                    <div className={styles.replyContent}>
                      <div className={styles.replyHeader}>
                        <Link
                          to={`/${r.username || "#"}`}
                          className={styles.replyUserName}
                        >
                          {r.username || "Unknown User"}
                        </Link>
                        {loggedInUserId === r.userId && (
                          <FaTrash
                            className={styles.deleteCommentIcon}
                            onClick={() => setDeleteCommentModal(r._id)}
                          />
                        )}
                      </div>
                      <p className={styles.replyText}>{r.text}</p>
                      {r.createdAt ? (
                        <span className={styles.replyTimestamp}>
                          {formatDistanceToNow(parseISO(r.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      ) : (
                        <span className={styles.replyTimestamp}>Just now</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        )}

        {deleteModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>Are you sure you want to delete this post?</p>
              <button
                onClick={handleDeletePost}
                className={styles.deleteButton}
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className={styles.cancelButton}
              >
                No
              </button>
            </div>
          </div>
        )}

        {deleteCommentModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>Are you sure you want to delete this comment?</p>
              <button
                onClick={() => handleDeleteComment(deleteCommentModal)}
                className={styles.deleteButton}
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteCommentModal(null)}
                className={styles.cancelButton}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;