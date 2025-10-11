import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import Reel from '../../components/Reel';

const Home = () => {
  const reelsRef = useRef(null);
  const [videos, setVideos] = useState([]);

  // ✅ Fetch food items from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/food/", { withCredentials: true })
      .then((res) => {
        // console.log("Full API response:", res.data);

        const fetchedVideos = res?.data?.foodItems || [];
        setVideos(fetchedVideos);

        if (fetchedVideos.length > 0) {
          console.log("First video item:", fetchedVideos[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching food items:", err);
      });
  }, []);

  // ✅ Play/Pause videos on scroll
  useEffect(() => {
    if (!reelsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((err) =>
              console.warn("Autoplay blocked:", err)
            );
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { root: reelsRef.current, threshold: 0.75 }
    );

    const videoElements = reelsRef.current.querySelectorAll("video");
    videoElements.forEach((v) => observer.observe(v));

    return () => observer.disconnect();
  }, [videos]);

  const likeVideo = async (id)=>{
    const res = await axios.post('http://localhost:5000/api/food/like',{foodItemId:id},{withCredentials:true});
    console.log(res.data);
    if(res.data.like){

      setVideos(videos.map(v=>v._id===id ? {...v,likeCount:v.likeCount+1} : v));
    }
    else{
      
      setVideos(videos.map(v=>v._id===id ? {...v,likeCount:v.likeCount-1} : v));
    }
  }

  const saveVideo = async(id)=>{
    const res = await axios.post('http://localhost:5000/api/food/save',{foodItemId:id},{withCredentials:true});
    console.log(res.data);
    if(res.data.save){
      setVideos(videos.map(v=>v._id===id ? {...v,saveCount:v.saveCount+1} : v));
    }
    else{
      setVideos(videos.map(v=>v._id===id ? {...v,saveCount:v.saveCount-1} : v));
    }
  }
  return (
    <div className="reels-container" ref={reelsRef}>
      {videos.length > 0 ? (
        videos.map((item, idx) => (
          <Reel key={item._id || idx} item={item} onLike={likeVideo} onSave={saveVideo} variant="full" />
        ))
      ) : (
        <p style={{ color: "#fff", textAlign: "center", padding: 24 }}>
         Loding...
        </p>
      )}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <Link to="/home"><HomeOutlinedIcon/><span style={{ fontSize: 10 }}>Home</span></Link>
        <Link to="/saved"><BookmarkOutlinedIcon/><span style={{ fontSize: 10 }}>Saved</span></Link>
      </nav>
    </div>
  );
};


export default Home;
