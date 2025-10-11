import React, { useState } from "react";
import "./createFood.css"; // mobile-first css
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const naigate = useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // prepare form data for backend
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("name", name);
    formData.append("description", description);

    await axios.post('http://localhost:5000/api/food/',formData,{withCredentials:true})
    .then((res)=>{
      console.log(res.data);
      alert("Food item created successfully!");
      setVideoFile(null);
      setName("");
      setDescription("");
      naigate('/home')
    })
    // here you would send `formData` via axios or fetch
    // console.log("Submitting Food Item:", { videoFile, name, description });
  };

  return (
    <div className="food-form-container">
      <h2>Create Food Item</h2>
      <form onSubmit={handleSubmit} className="food-form">
        <label>
          Upload Video:
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Create
        </button>
      </form>

      {videoFile && (
        <div className="video-preview">
          <video src={URL.createObjectURL(videoFile)} controls />
        </div>
      )}
    </div>
  );
};

export default CreateFood;
