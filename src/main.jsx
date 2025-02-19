import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import App from "./App";
import Referrals from "./pages/Referrals";
import About from "./pages/About"; // ✅ Import About Us Page
import "./App.css";

// Fix Buffer Issues
import { Buffer } from "buffer";
if (!window.Buffer) {
  window.Buffer = Buffer;
}

console.log("✅ Main.jsx is rendering...");

const endpoint = clusterApiUrl("mainnet-beta");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/referrals" element={<Referrals />} />
              <Route path="/referrals/:referrer" element={<Referrals />} /> {/* ✅ Keeps referral logic */}
              <Route path="/about" element={<About />} /> {/* ✅ About Us page now properly linked */}
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);

