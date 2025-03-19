import React, { useEffect, useState } from 'react'
import Header from './Header'


const Home = () => {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const getFeedPosts = async()=>{
      try{
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
      }
      catch(err){
        console.error(err);
      }
    }
    getFeedPosts();
  },[])
  return (
    <>
    
    <Header/>
    
    </>
  )
}

export default Home