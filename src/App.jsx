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
        <h1 className="title" style={{ marginBottom: "-10px" }}>
  Welcome to <span className="glow">$CLAIM</span>
</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
          <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link> {/* ✅ NEW BUTTON */}

</nav>

      {/* Contract Address Section (Lowered) */}
      <div className="contract-container" style={{ marginTop: "-15px" }}>
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


