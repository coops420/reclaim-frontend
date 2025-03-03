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
        <Link to="/referrals" className="nav-button">Buy $Claim</Link>
        <Link to="/vendors" className="nav-button">Shop</Link>
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

      {/* ✅ Entered in the Giveaways List */}
      <div className="giveaway-entries">
        <h2 className="giveaway-entries-title">Entered in the Giveaways</h2>
        <ul className="entries-list">
          <li>Jack St****</li>
          <li>GorillapackGenetics</li>
          <li>Dick **nes</li>
          <li>Fuckhead - Shawn</li>
          <li>Tristen W****</li>
          <li>Ethan **** / Suwooravioli / ETH</li>
          <li>Cole De****</li>
          <li>Take Up Tucson</li>
          <li>Nick A****</li>
          <li>Juanito</li>
          <li>Zaid G (CrypRap)</li>
          <li>Clay Ross****</li>
          <li>Greatmarques1</li>
          <li>Goldfishhhh Collectibles</li>
          <li>Gorillapack Friend</li>
          <li>Dropkick jones</li>
           <li>Cruz_Crispin</li>
            <li>CountVp</li>

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
