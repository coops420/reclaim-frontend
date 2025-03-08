import React from "react";
import { Link } from "react-router-dom";
import "./Vendors.css";
import coopersGlassImg from "../assets/coopersglass.jpg";

const Vendors = () => {
  return (
    <div className="vendors-container">
      {/* Navigation Buttons */}
      <nav className="nav-links" style={{ marginTop: "-10px" }}>
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim</Link>
        <Link to="/vendors" className="nav-button">Shop</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* Page Title */}
      <h1 className="page-title">VENDORS</h1>

      <div className="vendors-grid">
        {/* Coopers Glass – Link to the dedicated vendor page */}
        <Link to="/vendors/coopersglass" className="vendor-item">
          <img
            src={coopersGlassImg}
            alt="Coopers Glass"
            className="vendor-image"
          />
          <div className="vendor-name">Coopers Glass</div>
        </Link>
      </div>
    </div>
  );
};

export default Vendors;

