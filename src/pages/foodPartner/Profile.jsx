import React, { useEffect, useState } from "react";
import "../foodPartner/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const DashboardLayout = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/food-partner/${id}`,
          { withCredentials: true }
        );
        setProfileData(res.data?.foodPartner);
        setVideos(res.data?.foodPartner?.foodItems || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    if (id) fetchProfileData();
  }, [id]);

  return (
    <div className="dashboard-container primary-bg">
      {/* HEADER */}
      <div className="header-section secondary-bg">
        <div className="profile-circle"></div>
        <div className="info-buttons">
          <button className="info-btn button-bg">
            {profileData?.restaurantName || "Business name"}
          </button>
          <button className="info-btn button-bg">
            {profileData?.location || "Address"}
          </button>
        </div>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">total meals</span>
            <span className="stat-value">
              {profileData?.totalMeals || 43}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">customer serve</span>
            <span className="stat-value">
              {profileData?.customers || "15K"}
            </span>
          </div>
        </div>
      </div>

      {/* VIDEOS GRID */}
      <div className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video, i) => (
            <div key={i} className="video-card card-bg">
              <video
                className="video-element"
                src={video?.vedio}   // 👈 adjust to your backend field
                controls
                muted
                loop

              />
            </div>
          ))
        ) : (
          <p style={{ color: "#fff", gridColumn: "1/-1", textAlign: "center" }}>
            No videos available
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
