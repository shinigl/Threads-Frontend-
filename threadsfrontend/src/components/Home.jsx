import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import Posts from "./Posts";
import styles from "./Home.module.css"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        // console.log(data);

        if (data.error) {
          toast.error(data.error);
        } else {
          setPosts(data);
        }
      } catch (err) {
        toast.error("Failed to load posts!");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, []);
  

  return (
    <>
      <Header />
      <ToastContainer />

      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : posts.length === 0 ? (
          <div className={styles.fallback}>
            <p>Wow, it's lonely in here 🥶 Either you haven’t followed anyone, or your followed ones have taken a vow of silence. 📵</p>
          </div>
        ) : (
          <div className={styles.postsContainer}>
            {posts.map((post) => (
              <Posts 
                key={post._id}
                postId={post._id}
                postedBy={post.postedBy}
                profilePic={post.profilePic}
                text={post.text}
                img={post.img}
                likes={post.likes}
                replies={post.replies}
               
              />
            )).reverse()}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
