import React, { useEffect, useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);

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
      {loading ? (
        <p>Loading feed...</p>
      ) : posts.length === 0 ? (
        <p>Follow some users to see posts on your feed.</p>
      ) : (
        <div className="postsContainer">
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
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
