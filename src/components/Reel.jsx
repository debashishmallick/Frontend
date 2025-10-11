import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

const pickSrc = (item) =>
  item?.vedio || item?.video || item?.src || item?.media || item?.thumbnail || "";

const Reel = ({
  item = {},
  onLike = () => {},
  onSave = () => {},
  variant = "full",
  linkTo,
}) => {
  const src = pickSrc(item);
  const liked = !!item.liked;
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const containerClass =
    variant === "card" ? "reel-item reel-card" : "reel-item";

  const handleVisit = (e) => {
    e.stopPropagation();
    navigate(`/food-partner/${item.foodPartner || ""}`);
  };

  // 🟢 Pause on hover & resume on mouse leave (for Saved page)
  const handleMouseEnter = () => {
    if (variant === "card" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (variant === "card" && videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ✅ Always render a video */}
      <video
        ref={videoRef}
        className={variant === "card" ? "reel-card-video" : "reel-video"}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          objectFit: "cover",
          background: "#000",
        }}
      />

      {/* ✅ Hide actions and overlay on Saved Page */}
      {variant !== "card" && (
        <>
          <div className="reel-actions">
            <button
              onClick={() => onLike(item._id || item.id)}
              className={`reel-action-btn ${liked ? "liked" : ""}`}
              aria-label={liked ? "unlike" : "like"}
            >
              {liked ? (
                <FavoriteIcon style={{ color: "#ff4d6d" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <div className="reel-action-label">{item.likeCount ?? 0}</div>

            <button
              onClick={() => onSave(item._id || item.id)}
              className="reel-action-btn"
              aria-label="save"
            >
              <BookmarkAddOutlinedIcon />
            </button>
            <div className="reel-action-label">{item.saveCount ?? 0}</div>

            <button className="reel-action-btn" aria-label="comment">
              <TextsmsOutlinedIcon />
            </button>
            <div className="reel-action-label">
              {item.commentCount ?? item.comments ?? 0}
            </div>
          </div>

          <div className="reel-overlay">
            <div className="reel-desc">{item.description}</div>

            {linkTo ? (
              <div className="visit-store-btn">Visit Store</div>
            ) : (
              <button className="visit-store-btn" onClick={handleVisit}>
                Visit Store
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Reel;
