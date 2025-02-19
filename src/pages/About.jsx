import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import for navigation links
import "./About.css"; // Ensure CSS includes animations

const About = () => {
  const [scrollText, setScrollText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollText((prev) => prev + 0.5); // Slower scrolling speed
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      {/* ✅ Navigation at the Top */}
    

      {/* Background Overlay with Flickering Effect */}
      <div className="overlay" />

      {/* Cinematic Scrolling Movie Intro Text */}
      <div className="scrolling-text" style={{ transform: `translateY(-${scrollText}px)` }}>
        <h1 className="movie-title flicker">Welcome to Reclaim ($CLAIM)</h1>
        <p className="fade-in">
          Reclaim is a <span className="highlight">community-driven cryptocurrency</span> dedicated to supporting the community.
          <span className="glow"></span>        
        </p>
        <h2 className="slide-in">🌍 Our Mission</h2>
        <p className="fade-in-delayed">
          - Fair and transparent tokenomics<br/>
          - Secure and decentralized ecosystem<br/>
          - Community-driven governance<br/>
          - Support for victims of fraudulent projects
        </p>

        <div className="token-info">
          <h2>About Us</h2>
          <ul>
              <li>Total Supply: 1,500,000,000 $CLAIM</li>
              <li>Token Supply 70% Locked Up!</li>
              <li>Community Rewards WEEKLY To All Holders!</li>
              <li>Monthly Giveaways!</li>
              <li>Weekly Token Burns!</li>
              <li>$Claim Vendors Offering Discounts!</li>
              <li>Referral And LP/Staking Rewards!</li>
          </ul>
        </div>

        <h2 className="glow">📈 Trading Info</h2>
        <p className="fade-in-delayed">
          ✅ <b>Contract Address:</b> <code className="contract">4vAxFw4b4cGEV7CzEcbWFJ38N3FTa1BxRM828xEzcxQR</code><br/>
          🔗 <a href="https://dexscreener.com/solana/4vAxFw4b4cGEV7CzEcbWFJ38N3FTa1BxRM828xEzcxQR" target="_blank" className="link-hover">View on Dexscreener</a>
        </p>
      </div>
    </div>
  );
};

export default About;


