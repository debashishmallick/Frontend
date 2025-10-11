import React, { useEffect, useState } from "react";
import "./saved.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import Reel from "../../components/Reel";
import axios from "axios";

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  console.log("Saved items state:", savedItems);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/food/save", { withCredentials: true })
      .then((res) => {
        const payload = res?.data || {};
        console.log("Full API response for saved items:", payload);

        const list =
          payload?.savedItem ||
          payload?.savedItems ||
          payload?.items ||
          payload ||
          [];
        setSavedItems(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error("Error fetching saved items:", err);
        setSavedItems([]);
      });
  }, []);

  return (
    <div className="saved-page">
      <header>
        <h2>Saved</h2>
      </header>

      <div className="saved-grid">
        {savedItems && savedItems.length > 0 ? (
          savedItems.map((s) => {
            const item = s.food || s;
            const foodPartnerId =
              item.foodPartner || s.foodPartner || s.partnerId;
            const linkTo = foodPartnerId
              ? `/food-partner/${foodPartnerId}`
              : "/home";

            return (
              <div
                key={s._id || s.id || item._id || item.id}
                className="saved-card"
              >
                <Link
                  to={linkTo}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Reel
                    item={item}
                    variant="card"
                    onLike={() => {}}
                    onSave={() => {}}
                    linkTo={linkTo}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div style={{ color: "#fff", opacity: 0.85, padding: 12 }}>
            No saved items yet.
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <Link to="/home">
          <HomeOutlinedIcon />
          <span style={{ fontSize: 10 }}>Home</span>
        </Link>
        <Link to="/saved">
          <BookmarkOutlinedIcon />
          <span style={{ fontSize: 10 }}>Saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Saved;
