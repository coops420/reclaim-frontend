import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Vendors.css";
import gorillaPackImage from "../assets/gorillapackgenetics.webp";
// Import Coopers Glass vendor image
import coopersGlassImg from "../assets/coopersglass.jpg";

// Example product images (update with real images)
import product1 from "../assets/sonicspillproof.jpg";   // Sonic Cropal Spillproof
import product2 from "../assets/lilactiptop.jpg";          // Lilac TipTop
import product3 from "../assets/neonpuffer.jpg";           // Electric Neon Puffer
import product4 from "../assets/mintcropalpuffer.jpg";       // Mint Crushed Opal Puffer
import product5 from "../assets/soniccropalpuffer.jpg";      // Sonic Crushed Opal Puffer
import product6 from "../assets/blackcropalpuffer.jpg";      // Black Crushed Opal Puffer
import product7 from "../assets/hybridneon.png";             // Electric Neon Hybrid Proxy Peak Spillproof

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
          src={coopersGlassImg}
          alt="Coopers Glass"
          className="vendor-image"
        />
      </div>

      {/* Render nested routes here if a product is active */}
      <Outlet />

      {/* Products Grid (displayed by default if no nested route is active) */}
      <div className="vendors-grid">
        {/* Product 1 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product1">
            <img src={product1} alt="Sonic Cropal Spillproof" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Sonic Cropal Spillproof</p>
              <p className="product-retail-price"><del>Retail: $475.00</del></p>
              <p className="product-sale-price">Claim: $325.00</p>
            </div>
          </Link>
        </div>

        {/* Product 2 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product2">
            <img src={product2} alt="Lilac TipTop" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Lilac TipTop</p>
              <p className="product-retail-price"><del>Retail: $125.00</del></p>
              <p className="product-sale-price">Claim: $95.00</p>
            </div>
          </Link>
        </div>

        {/* Product 3 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product3">
            <img src={product3} alt="Electric Neon Puffer" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Electric Neon Puffer</p>
              <p className="product-retail-price"><del>Retail: $325.00</del></p>
              <p className="product-sale-price">Claim: $225.00</p>
            </div>
          </Link>
        </div>

        {/* Product 4 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product4">
            <img src={product4} alt="Mint Crushed Opal Puffer" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Mint Crushed Opal Puffer</p>
              <p className="product-retail-price"><del>Retail: $375.00</del></p>
              <p className="product-sale-price">Claim: $275.00</p>
            </div>
          </Link>
        </div>

        {/* Product 5 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product5">
            <img src={product5} alt="Sonic Crushed Opal Puffer" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Sonic Crushed Opal Puffer</p>
              <p className="product-retail-price"><del>Retail: $350.00</del></p>
              <p className="product-sale-price">Claim: $275.00</p>
            </div>
          </Link>
        </div>

        {/* Product 6 */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product6">
            <img src={product6} alt="Black Crushed Opal Puffer" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Black Crushed Opal Puffer</p>
              <p className="product-retail-price"><del>Retail: $375.00</del></p>
              <p className="product-sale-price">Claim: $225.00</p>
            </div>
          </Link>
        </div>

        {/* Product 7 - New Product: Electric Neon Hybrid Proxy Peak Spillproof */}
        <div className="product-item">
          <Link to="/vendors/coopersglass/product7">
            <img src={product7} alt="Electric Neon Hybrid Proxy Peak Spillproof" className="product-image" />
            <div className="product-hover">
              <p className="product-name">Electric Neon Hybrid Proxy Peak Spillproof</p>
              <p className="product-retail-price"><del>Retail: $650.00</del></p>
              <p className="product-sale-price">Claim: $450.00</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoopersGlass;

