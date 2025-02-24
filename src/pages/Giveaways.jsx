import React from "react";
import { Link } from "react-router-dom";
import "./Giveaways.css";
import CountdownTimer from "../components/CountdownTimer"; // ✅ Import Countdown Component

const Giveaways = () => {
  return (
    <div className="giveaways-container">
      {/* ✅ Navigation */}
      <nav className="nav-links" style={{ marginTop: "70px" }}>
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* ✅ Giveaway Title */}
      <h1 className="giveaway-prize">
         <b>THIS MONTH’S PRIZE</b>: <span className="highlight">$600 IN CUSTOM HEADY GLASS!</span> 
      </h1>

      {/* ✅ Bullet List for Giveaway Info */}
      <div className="giveaway-info">
        <ul className="giveaway-list">
          <li>
            Every <b>2nd</b> of the month, we hold a <b>Giveaway</b> for our loyal holders! 🔥
          </li>
          <li>
            <b>Minimum Holding:</b> $10 USD in $CLAIM
          </li>
          <li>
            Make sure you're holding <b>$CLAIM</b> and message <b>Kyle (Telegram)</b>.
            You're entered for each month's Giveaway! 🎁
          </li>
        </ul>
      </div>

      {/* ✅ Countdown Timer for Weekly Airdrop & Burn */}
      <div className="countdown-container">
        <h2 className="countdown-title">NEXT $CLAIM AIRDROP & BURN</h2>
        <CountdownTimer />
        <div className="countdown-info">Every Sunday at Midnight (PST)</div>
        <div className="countdown-note">ALL HOLDERS GET MORE $CLAIM BASED ON HOLDINGS</div>
      </div>
    </div>
  );
};

export default Giveaways;
