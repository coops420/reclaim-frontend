import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import App from "./App";
import Referrals from "./pages/Referrals";
import About from "./pages/About";
import Vendors from "./pages/Vendors"; 
import CoopersGlass from "./pages/CoopersGlass"; 
import CoopersGlassProduct1 from "./pages/CoopersGlassProduct1"; 
import CoopersGlassProduct2 from "./pages/CoopersGlassProduct2"; 
import CoopersGlassProduct3 from "./pages/CoopersGlassProduct3"; 
import CoopersGlassProduct4 from "./pages/CoopersGlassProduct4"; 
import CoopersGlassProduct5 from "./pages/CoopersGlassProduct5"; 
import ProductList from "./pages/ProductList"; 
import Giveaways from "./pages/Giveaways";
import StrawberryFritter from "./pages/StrawberryFritter";
import Plumz from "./pages/Plumz";
import HoneyDewPapaya from "./pages/HoneyDewPapaya";
import BathSalts from "./pages/BathSalts";

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
              <Route path="/honeydew-papaya" element={<HoneyDewPapaya />} />
              <Route path="/bathsalts" element={<BathSalts />} />

              {/* Vendors */}
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/coopersglass" element={<CoopersGlass />} />
              
              {/* Product Pages - These should be completely separate */}
              <Route path="/vendors/coopersglass/product1" element={<CoopersGlassProduct1 />} />
              <Route path="/vendors/coopersglass/product2" element={<CoopersGlassProduct2 />} />
              <Route path="/vendors/coopersglass/product3" element={<CoopersGlassProduct3 />} />
              <Route path="/vendors/coopersglass/product4" element={<CoopersGlassProduct4 />} />
              <Route path="/vendors/coopersglass/product5" element={<CoopersGlassProduct5 />} />
              
              {/* Catch-all route for other vendors */}
              <Route path="/vendors/:vendorId" element={<ProductList />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);

