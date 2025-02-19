import React, { useState } from "react";
import { Link } from "react-router-dom";
import TokenPrice from "./components/TokenPrice";
import "./App.css";

export default function App() {
  const contractAddress = "4vAxFw4b4cGEV7CzEcbWFJ38N3FTa1BxRM828xEzcxQR";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };

  return (
    <div className="homepage">
      <TokenPrice />

      {/* Hero Section */}
      <div className="hero">
        <h1 className="title">Welcome to <span className="glow">$CLAIM</span></h1>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/referrals" className="nav-button">Get $Claim Now (Desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link> {/* ✅ Corrected to lowercase "/vendors" */}
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link> {/* ✅ NEW BUTTON */}
       <Link to="/about" className="nav-button">About Us</Link>

</nav>

      {/* Contract Address Section (Lowered) */}
      <div className="contract-container" style={{ marginTop: "30px" }}>
        <p className="contract-label">Contract Address:</p>
        <button onClick={handleCopy} className="contract-button">
          {contractAddress} 📋
        </button>
        {copied && <p className="copy-confirm">Copied!</p>}
      </div>

      {/* Telegram Button - Added Neatly at the Bottom */}
      <div className="telegram-container">
        <a href="https://t.me/reclaimtoken" target="_blank" rel="noopener noreferrer" className="telegram-button">
          Join Our Telegram 🚀
        </a>
      </div>
    </div>
  );
}


