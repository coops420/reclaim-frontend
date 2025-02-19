import React from "react";
import { Link } from "react-router-dom";
import TokenPrice from "./components/TokenPrice"; // ✅ Import Token Price Component
import "./App.css";

export default function App() {
  return (
    <div className="homepage">
      <TokenPrice /> {/* ✅ Display token price */}

      {/* Hero Section */}
      <div className="hero">
        <h1 className="title">Welcome to <span className="glow">$CLAIM</span></h1>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/referrals" className="nav-button">Get $Claim Now(pc)</Link>
        <Link to="/leaderboard" className="nav-button">Leaderboard</Link>
        <Link to="/about" className="nav-button">About Us</Link>
      </nav>
    </div>
  );
}



