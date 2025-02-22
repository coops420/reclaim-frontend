import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import App from "./App";
import Referrals from "./pages/Referrals";
import About from "./pages/About";
import Vendors from "./pages/Vendors"; // ✅ Import Vendors Page
import ProductList from "./pages/ProductList"; // ✅ Product List Page
import Giveaways from "./pages/Giveaways"; // ✅ Giveaways Page
import StrawberryFritter from "./pages/StrawberryFritter"; // ✅ New Product Page

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
              <Route path="/about" element={<About />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/:vendorId" element={<ProductList />} />
              <Route path="/giveaways" element={<Giveaways />} />
              <Route path="/strawberry-fritter" element={<StrawberryFritter />} /> {/* ✅ New Product Page */}
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);
