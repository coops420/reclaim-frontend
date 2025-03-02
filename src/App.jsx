import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TokenPrice from "./components/TokenPrice";
import StrawberryFritter from "./pages/StrawberryFritter"; // ✅ Import Product Page
import Vendors from "./pages/Vendors";
import About from "./pages/About";
import Giveaways from "./pages/Giveaways";
import Referrals from "./pages/Referrals";
import "./App.css";

export default function App() {
  const contractAddress = "EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <Link to="/referrals" className="nav-button">Buy $Claim</Link>
        <Link to="/vendors" className="nav-button">Shop</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* Routing Setup */}
      <Routes>
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/about" element={<About />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/strawberry-fritter" element={<StrawberryFritter />} /> {/* ✅ New Product Page */}
      </Routes>

      {/* Contract Address Section */}
      <div className="contract-container" style={{ marginTop: "-15px" }}>
        <p className="contract-label">Contract Address:</p>
        <button onClick={handleCopy} className="contract-button">
          {contractAddress} 📋
        </button>
        {copied && <p className="copy-confirm">Copied!</p>}
      </div>

      {/* Telegram Button */}
      <div className="telegram-container">
        <a href="https://t.me/reclaimtoken" target="_blank" rel="noopener noreferrer" className="telegram-button">
          Join Our Telegram 🚀
        </a>
      </div>
    </div>
  );
}
