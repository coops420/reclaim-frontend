import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductList.css";
import vendorImage from "../assets/gorillapackgenetics.webp"; // ✅ Ensure this file exists
import kushpack from "/src/assets/kushpack.webp";


const ProductList = () => {
  const { vendorId } = useParams();

  return (
    <div className="product-list-container">
      {/* 🔹 Navigation Buttons (At the Top) */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
      </nav>

      {/* 🔹 Vendor Image at the Top */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Vendor" className="vendor-image" />
      </div>

      {/* 🔹 Products Grid */}
      <div className="products-grid">
        {/* Example Product */}
        <div className="product-item">
          <img src={kushpack} alt="Kush Pack" className="product-image" />
          <div className="product-hover">
            <p className="product-name">Kush Pack</p>
            <p className="product-price">💲50.00</p>
          </div>
        </div>
        {/* More products can be mapped here dynamically */}
      </div>
    </div>
  );
};

export default ProductList;

