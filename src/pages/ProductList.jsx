import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductList.css";
import vendorImage from "../assets/gorillapackgenetics.webp"; // ✅ Ensure this file exists
import strawberryFritter from "/src/assets/applefritter.jpg"; // ✅ Update Image Path

const ProductList = () => {
  const { vendorId } = useParams();

  return (
    <div className="product-list-container">
      {/* 🔹 Navigation Buttons (At the Top) */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* 🔹 Vendor Image - Fixed Size */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Vendor" className="vendor-image product-image" />
      </div>

      {/* 🔹 Products Grid */}
      <div className="products-grid">
        {/* 🔹 Updated Product */}
        <div className="product-item">
          <Link to="/strawberry-fritter"> {/* ✅ Clickable Link to Product Page */}
            <img src={strawberryFritter} alt="Strawberry Fritter Rosin" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Strawberry Fritter Rosin</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

