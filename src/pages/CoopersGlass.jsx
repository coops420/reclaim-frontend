import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import coopersGlassImage from "../assets/coopersglass.jpg"; // Vendor image for Coopers Glass

// Example product images (update with real images)
import product1 from "../assets/sonicspillproof.jpg";
import product2 from "../assets/lilactiptop.jpg";
import product3 from "../assets/neonpuffer.jpg";

const CoopersGlass = () => {
  return (
    <div className="product-list-container">
      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* Vendor Header */}
      <div className="vendor-header">
        <img
          src={coopersGlassImage}
          alt="Coopers Glass"
          className="vendor-image product-image"
        />
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {/* Product 1 */}
        <div className="product-item">
          <Link to="/coopersglass/product1">
            <img src={product1} alt="Product 1" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Sonic Cropal Spillproof</p>
              <p className="product-retail-price">
                <del>Retail: $475.00</del>
              </p>
              <p className="product-sale-price">Claim: $325.00</p>
            </div>
          </Link>
        </div>

        {/* Product 2 */}
        <div className="product-item">
          <Link to="/coopersglass/product2">
            <img src={product2} alt="Product 2" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Lilac TipTop</p>
              <p className="product-retail-price">
                <del>Retail: $125.00</del>
              </p>
              <p className="product-sale-price">Claim: $95.00</p>
            </div>
          </Link>
        </div>

        {/* Product 3 */}
        <div className="product-item">
          <Link to="/coopersglass/product3">
            <img src={product3} alt="Product 3" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Electric Neon Puffer</p>
              <p className="product-retail-price">
                <del>Retail: $325.00</del>
              </p>
              <p className="product-sale-price">Claim: $225.00</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoopersGlass;
