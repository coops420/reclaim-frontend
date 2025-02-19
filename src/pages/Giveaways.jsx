import React from "react";
import { Link } from "react-router-dom";
import "./Giveaways.css";

const Giveaways = () => {
  return (
    <div className="giveaways-container">
      {/* ✅ Navigation at the very top */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
      </nav>

      {/* ✅ Giveaway Announcement (Glowing Title, Positioned Higher) */}
      <h1 className="giveaway-prize">🎁 **THIS MONTH’S PRIZE**: $600 IN CUSTOM HEADY GLASS! 🔥</h1>

      {/* ✅ Main content moved up slightly */}
      <div className="giveaway-content">
        <div className="giveaway-section">
          Every <b>2nd</b> of the month, we hold a <b>Giveaway</b> for our loyal holders! 🔥
        </div>

        <div className="giveaway-section">
          🔥 <b>Minimum Holding:</b> $10 USD in $CLAIM
        </div>

        <div className="giveaway-section">
          Make sure you're holding <b>$CLAIM</b> and message <b>Kyle (Telegram)</b>.
          You're entered for each month's Giveaway! 🎁
        </div>
      </div>
    </div>
  );
};

export default Giveaways;
