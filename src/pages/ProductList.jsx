import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductList.css";
import vendorImage from "../assets/gorillapackgenetics.webp"; // Vendor image
import strawberryFritter from "/src/assets/applefritter.jpg"; // Strawberry Fritter image
import plumzImage from "/src/assets/plumz.jpg"; // Plumz image
import honeydewPapayaImage from "../assets/honeydewpapaya.jpg"; // HoneyDew Papaya image
import bathsaltsImage from "../assets/bathsalts.jpg"; // BathSalts image

const ProductList = () => {
  const { vendorId } = useParams();

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

      {/* Vendor Image */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Vendor" className="vendor-image product-image" />
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {/* Strawberry Fritter Product */}
        <div className="product-item">
          <Link to="/strawberry-fritter">
            <img src={strawberryFritter} alt="Strawberry Fritter Rosin" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Strawberry Fritter Live Rosin</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>

        {/* Plumz Product */}
        <div className="product-item">
          <Link to="/plumz">
            <img src={plumzImage} alt="Plumz Live Rosin" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Plumz Live Rosin</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>

        {/* HoneyDew Papaya Product */}
        <div className="product-item">
          <Link to="/honeydew-papaya">
            <img src={honeydewPapayaImage} alt="HoneyDew Papaya Live Rosin" className="product-image" />
            <div className="product-hover">
              <p className="product-name">HoneyDew Papaya Live Rosin</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>

        {/* BathSalts Product */}
        <div className="product-item">
          <Link to="/bathsalts">
            <img src={bathsaltsImage} alt="BathSalts" className="product-image" />
            <div className="product-hover">
              <p className="product-name">BathSalts</p>
              <p className="product-price">💲50.00</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;


