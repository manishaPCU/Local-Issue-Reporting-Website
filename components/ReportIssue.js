import React, { useState, useEffect } from "react";
import "../App.css";

function ReportIssue() {
  // 👇 this ensures scroll only works on this page
  useEffect(() => {
    document.body.style.overflow = "auto"; // allow scroll on this page
    return () => {
      document.body.style.overflow = "hidden"; // stop scroll when leaving
    };
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo: null,
    location: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Issue submitted successfully!");
  };

  return (
    <div className="report-background">
         <header className="top-header">
      <h2>CityPulse</h2>
      <div className="header-links">
        <a href="/">Home</a>
        
        <a href="/about">About</a>
        <a href="/explore">Explore</a>
      </div>
    </header>
      <div className="report-container">
        <h1>Report a New Issue</h1>
        <p>Help your community by reporting local issues.</p>

        <form className="report-form" onSubmit={handleSubmit}>
          <label>Issue Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter issue title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Issue Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe the issue"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="pothole">Pothole</option>
            <option value="garbage">Garbage</option>
            <option value="streetlight">Streetlight</option>
            <option value="water">Water Leakage</option>
          </select>

          <label>Upload Photo</label>
          <input type="file" name="photo" onChange={handleChange} />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter or auto-detect location"
            value={formData.location}
            onChange={handleChange}
          />

          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;

