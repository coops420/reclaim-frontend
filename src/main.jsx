import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import CoopersGlassProduct4 from "./pages/CoopersGlassProduct4"; // Product 4 page
import CoopersGlassProduct5 from "./pages/CoopersGlassProduct5"; // Product 5 page
import Cropalpuffer from "./pages/cropalpuffer.jsx"; // Product 6: Black Crushed Opal Puffer
import NeonHybrid from "./pages/NeonHybrid.jsx"; // Product 7: Electric Neon Hybrid Proxy Peak Spillproof
import LVCrushedOpalPuffer from "./pages/LVCrushedOpalPuffer"; // Product 8: LV Crushed Opal Puffer
import EaglesXLJoystickCropalStick from "./pages/EaglesXL.jsx"; // Product 9: Eagles XL Joystick Cropal Stick
import ProductList from "./pages/ProductList"; // Dynamic product list for other vendors
import Giveaways from "./pages/Giveaways";
import StrawberryFritter from "./pages/StrawberryFritter";
import Plumz from "./pages/Plumz";
import Plumz1 from "./pages/plumz1"; // New Plumz1 page
import HoneyDewPapaya from "./pages/HoneyDewPapaya";
import Honey2 from "./pages/Honey2"; // New page from honey2.jsx
import BathSalts from "./pages/BathSalts";
import GarlicAmarettoLiveResin from "./pages/garlic"; // New garlic page

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
              <Route path="/giveaways" element={<Giveaways />} />
              <Route path="/strawberry-fritter" element={<StrawberryFritter />} />
              <Route path="/plumz" element={<Plumz />} />
              <Route path="/plumz1" element={<Plumz1 />} />
              <Route path="/honeydew-papaya" element={<HoneyDewPapaya />} />
              <Route path="/honey2" element={<Honey2 />} /> {/* New Honey2 route */}
              <Route path="/bathsalts" element={<BathSalts />} />
              <Route path="/garlic" element={<GarlicAmarettoLiveResin />} /> {/* New Garlic page */}

              {/* Vendors and their product pages as separate routes */}
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/coopersglass" element={<CoopersGlass />} />
              <Route path="/vendors/coopersglass/product1" element={<CoopersGlassProduct1 />} />
              <Route path="/vendors/coopersglass/product2" element={<CoopersGlassProduct2 />} />
              <Route path="/vendors/coopersglass/product3" element={<CoopersGlassProduct3 />} />
              <Route path="/vendors/coopersglass/product4" element={<CoopersGlassProduct4 />} />
              <Route path="/vendors/coopersglass/product5" element={<CoopersGlassProduct5 />} />
              <Route path="/vendors/coopersglass/product6" element={<Cropalpuffer />} />
              <Route path="/vendors/coopersglass/product7" element={<NeonHybrid />} />
              <Route path="/vendors/coopersglass/product8" element={<LVCrushedOpalPuffer />} />
              <Route path="/vendors/coopersglass/product9" element={<EaglesXLJoystickCropalStick />} />

              {/* Fallback dynamic vendor route */}
              <Route path="/vendors/:vendorId" element={<ProductList />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);
