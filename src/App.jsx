import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import StrawberryFritter from "./pages/StrawberryFritter"; // ✅ Import Product Page
import Vendors from "./pages/Vendors";
import About from "./pages/About";
import Giveaways from "./pages/Giveaways";
import Referrals from "./pages/Referrals";
import "./App.css";

export default function App() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="title" style={{ marginBottom: "-10px" }}>
          Coopers<span className="glow">GLASS</span>
        </h1>
      </div>

      {/* Navigation (Only Shop button retained) */}
      <nav className="nav-links">
        <Link to="/vendors" className="nav-button">Shop</Link>
      </nav>

      {/* Routing Setup */}
      <Routes>
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/about" element={<About />} />
        <Route path="/giveaways" element={<Giveaways />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/strawberry-fritter" element={<StrawberryFritter />} /> {/* ✅ New Product Page */}
      </Routes>
    </div>
  );
}
