import React from "react";
import { Link } from "react-router-dom";
import "./Vendors.css";
import gorillaPackImage from "../assets/gorillapackgenetics.webp";

const Vendors = () => {
  return (
    <div className="vendors-container">
      {/* 🔹 Navigation Buttons */}
      <nav className="nav-links" style={{ marginTop: "-10px" }}>
          <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link> {/* ✅ NEW BUTTON */}
       </nav>

      <h1 className="page-title">VENDORS</h1>

      <div className="vendors-grid">
        <Link to="/vendors/gorillapack" className="vendor-item">
          <img src={gorillaPackImage} alt="Gorilla Pack Genetics" className="vendor-image" />
          <div className="vendor-name">Gorilla Pack Genetics</div>
        </Link>
      </div>
    </div>
  );
};

export default Vendors;
