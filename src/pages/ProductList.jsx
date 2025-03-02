import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import vendorImage from "../assets/gorillapackgenetics.webp"; // Vendor image
import strawberryFritter from "/src/assets/applefritter.jpg"; // Strawberry Fritter image
import plumzImage from "/src/assets/plumz.jpg"; // Plumz image
import plumz1Image from "/src/assets/plumz1.jpg"; // Plumz1 image (NEW)
import honeydewPapayaImage from "../assets/honeydewpapaya.jpg"; // HoneyDew Papaya image
import bathsaltsImage from "../assets/bathsalts.jpg"; // BathSalts image

const ProductList = () => {
  return (
    <div className="product-list-container">
      {/* Navigation Buttons */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* Vendor Image & Description */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Vendor" className="vendor-image product-image" />
        <div className="vendor-description-box">
          <p><strong>Gorilla Pack Genetics</strong></p>
          <p>Small-batch, single-source excellence. 👌 Every product I offer is exclusively grown, processed, and curated in-house—from hunting elite genetics to the final product. These phenos are one-of-a-kind, meticulously selected by me, and unavailable anywhere else. 🔥👌</p>
          <p>Follow us for new drops & updates:  
            <a href="https://www.instagram.com/gorillapackgenetics?igsh=anIwM3hudzBocGZ1&utm_source=qr" 
               target="_blank" 
               rel="noopener noreferrer">
              📢 Instagram
            </a>
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {/* Plumz1 Product (NEW - Active) */}
        <div className="product-item">
          <Link to="/plumz1">
            <img src={plumz1Image} alt="Plumz1 Live Rosin" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Plumz1 Live Rosin</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>

        {/* Strawberry Fritter Product (Sold Out, unclickable) */}
        <div className="product-item sold-out">
          <img
            src={strawberryFritter}
            alt="Strawberry Fritter Live Rosin"
            className="product-image"
          />
          <div className="product-hover">
            <p className="product-name">Strawberry Fritter Live Rosin</p>
            <p className="product-price">Sold Out</p>
          </div>
        </div>

        {/* Plumz Product (Sold Out, unclickable) */}
        <div className="product-item sold-out">
          <img src={plumzImage} alt="Plumz Live Rosin" className="product-image" />
          <div className="product-hover">
            <p className="product-name">Plumz Live Rosin</p>
            <p className="product-price">Sold Out</p>
          </div>
        </div>

        {/* HoneyDew Papaya Product (Sold Out, unclickable) */}
        <div className="product-item sold-out">
          <img src={honeydewPapayaImage} alt="HoneyDew Papaya Live Rosin" className="product-image" />
          <div className="product-hover">
            <p className="product-name">HoneyDew Papaya Live Rosin</p>
            <p className="product-price">Sold Out</p>
          </div>
        </div>

        {/* BathSalts Product (Sold Out, unclickable) */}
        <div className="product-item sold-out">
          <img src={bathsaltsImage} alt="BathSalts" className="product-image" />
          <div className="product-hover">
            <p className="product-name">BathSalts Flower</p>
            <p className="product-price">Sold Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

