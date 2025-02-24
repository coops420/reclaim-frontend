import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import App from "./App";
import Referrals from "./pages/Referrals";
import About from "./pages/About";
import Vendors from "./pages/Vendors"; // Vendors list page
import CoopersGlass from "./pages/CoopersGlass"; // Dedicated CoopersGlass vendor page
import CoopersGlassProduct1 from "./pages/CoopersGlassProduct1"; // Product 1 page
import CoopersGlassProduct2 from "./pages/CoopersGlassProduct2"; // Product 2 page
import CoopersGlassProduct3 from "./pages/CoopersGlassProduct3"; // Product 3 page
import ProductList from "./pages/ProductList"; // Dynamic product list for other vendors
import Giveaways from "./pages/Giveaways";
import StrawberryFritter from "./pages/StrawberryFritter";
import Plumz from "./pages/Plumz";
import HoneyDewPapaya from "./pages/HoneyDewPapaya";
import BathSalts from "./pages/BathSalts";

const endpoint = clusterApiUrl("mainnet-beta");

// Create a wrapper for nested vendor routes.
const VendorsWrapper = () => <Outlet />;

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

              {/* Nested vendor-related routes */}
              <Route path="/vendors" element={<VendorsWrapper />}>
                {/* When URL is exactly "/vendors", show the Vendors page */}
                <Route index element={<Vendors />} />
                {/* Dedicated vendor pages */}
                <Route path="gorillapack" element={<ProductList />} />
                <Route path="coopersglass" element={<CoopersGlass />} />
                {/* Any other vendor dynamically */}
                <Route path=":vendorId" element={<ProductList />} />
              </Route>

              {/* Dedicated product pages for Coopers Glass */}
              <Route path="/coopersglass/product1" element={<CoopersGlassProduct1 />} />
              <Route path="/coopersglass/product2" element={<CoopersGlassProduct2 />} />
              <Route path="/coopersglass/product3" element={<CoopersGlassProduct3 />} />

              <Route path="/giveaways" element={<Giveaways />} />
              <Route path="/strawberry-fritter" element={<StrawberryFritter />} />
              <Route path="/plumz" element={<Plumz />} />
              <Route path="/honeydew-papaya" element={<HoneyDewPapaya />} />
              <Route path="/bathsalts" element={<BathSalts />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);

