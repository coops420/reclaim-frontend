import React from "react";
import { Link } from "react-router-dom";
import "./Vendors.css";
import gorillaPackImage from "../assets/gorillapackgenetics.webp";

const Vendors = () => {
  return (
    <div className="vendors-container">
      {/* 🔹 Navigation Buttons */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/referrals" className="nav-button">Referrals</Link>
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
