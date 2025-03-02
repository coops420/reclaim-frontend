import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Vendors.css";
import coopersGlassImg from "../assets/coopersglass.jpg";

// Example product images (update with real images)
import product1 from "../assets/sonicspillproof.jpg";   // Sonic Cropal Spillproof
import product2 from "../assets/lilactiptop.jpg";       // Lilac TipTop
import product3 from "../assets/neonpuffer.jpg";        // Electric Neon Puffer
import product4 from "../assets/mintcropalpuffer.jpg";  // Mint Crushed Opal Puffer
import product5 from "../assets/soniccropalpuffer.jpg"; // Sonic Crushed Opal Puffer
import product6 from "../assets/blackcropalpuffer.jpg"; // Black Crushed Opal Puffer
import product7 from "../assets/hybridneon.png";        // Electric Neon Hybrid Proxy Peak Spillproof
import product8 from "../assets/lvpuffer.jpg";          // LV Crushed Opal Puffer
import product9 from "../assets/eaglesXL.jpg";         // Eagles XL Joystick Cropal Stick

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

      {/* Vendor Image & Description */}
      <div className="vendor-header">
        <img src={coopersGlassImg} alt="Coopers Glass" className="vendor-image product-image" />
        <div className="vendor-description-box">
          <p><strong>Coopers Glass</strong></p>
          <p>A highly respected artist with over a decade in the game, continuously innovating and inspiring the glassblowing community. Known for pioneering new designs and setting industry standards, Coopers Glass stays ahead with unmatched quality and top-tier support. 🔥✨</p>
          <p>Connect on Instagram:  
            <a href="https://instagram.com/coopersglass" 
               target="_blank" 
               rel="noopener noreferrer">
              📢 ig@coopersglass
            </a>
          </p>
        </div>
      </div>

      {/* Render nested routes here if a product is active */}
      <Outlet />

      {/* Products Grid (displayed by default if no nested route is active) */}
      <div className="products-grid">
        {[product1, product2, product3, product4, product5, product6, product7, product8, product9].map((product, index) => (
          <div className="product-item" key={index}>
            <Link to={`/vendors/coopersglass/product${index + 1}`}>
              <img src={product} alt={`Product ${index + 1}`} className="product-image" />
              <div className="product-hover">
                <p className="product-name">
                  {[
                    "Sonic Cropal Spillproof",
                    "Lilac TipTop",
                    "Electric Neon Puffer",
                    "Mint Crushed Opal Puffer",
                    "Sonic Crushed Opal Puffer",
                    "Black Crushed Opal Puffer",
                    "Electric Neon Hybrid Proxy Peak Spillproof",
                    "LV Crushed Opal Puffer",
                    "Eagles XL Joystick Cropal Stick"
                  ][index]}
                </p>
                <p className="product-retail-price">
                  <del>
                    {[
                      "$475.00",
                      "$125.00",
                      "$325.00",
                      "$375.00",
                      "$350.00",
                      "$375.00",
                      "$650.00",
                      "$425.00",
                      "$115.00"
                    ][index]}
                  </del>
                </p>
                <p className="product-sale-price">
                  Claim: 
                  {[
                    "$325.00",
                    "$95.00",
                    "$225.00",
                    "$275.00",
                    "$275.00",
                    "$225.00",
                    "$450.00",
                    "$285.00",
                    "$85.00"
                  ][index]}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoopersGlass;

