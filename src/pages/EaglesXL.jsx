import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import "./ProductList.css";
import vendorImage from "../assets/coopersglass.jpg"; 
import productImage from "../assets/eaglesXL.jpg"; 
import emailjs from "emailjs-com";

// ** PRODUCTION - MAINNET CONNECTION **
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// ** RECIPIENT WALLET (SELLER) - UPDATE THIS **
const RECIPIENT_WALLET = new PublicKey("AfEanUHHtW1Eqos85FNUJCm7WSKr5PyeqneBt1PURRpW");

// ** CLAIM TOKEN MINT ADDRESS (IF NEEDED) **
const CLAIM_TOKEN_ADDRESS = "EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4"; 

// ** PRICING CONFIG **
const SALE_PRICE_USD = 85; // Price in USD
const CLAIM_CONVERSION_RATE = 0.10; // Set actual rate for $CLAIM

// ** EmailJS CONFIG (Update with actual IDs) **
const serviceID = "service_c4kj8it";
const sellerTemplateID = "cooper_au2yp3c";
const buyerTemplateID = "template_3mus039";
const publicKeyEmail = "BFAA9yJvj1yAllF9o";

const EaglesXLJoystickCropalStick = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [claimPrice, setClaimPrice] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  // ** Fetch the current $CLAIM price **
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Replace with actual API call to fetch $CLAIM price
        setClaimPrice(CLAIM_CONVERSION_RATE);
      } catch (err) {
        console.error("Error fetching $CLAIM price:", err);
      }
    };
    fetchPrice();
  }, []);

  // ** Compute Token Amount for Payment **
  const totalClaimAmount = claimPrice ? (SALE_PRICE_USD / claimPrice).toFixed(6) : "N/A";

  // ** SolanaPay QR Code URL **
  const phantomUrl = `https://phantom.app/ul?app=CoopersGlass&recipient=${RECIPIENT_WALLET.toString()}&mint=${CLAIM_TOKEN_ADDRESS}&amount=${totalClaimAmount}&label=Eagles%20XL%20Joystick%20Cropal%20Stick&message=Purchase%20of%20Eagles%20XL%20Joystick%20Cropal%20Stick`;

  // ** Ensure Wallet is Connected Before Purchase **
  const ensureWalletConnected = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Please install Phantom Wallet.");
      return null;
    }

    if (!publicKey) {
      try {
        let wallet = await window.solana.connect();
        return wallet.publicKey;
      } catch (err) {
        console.error("Wallet connection failed", err);
        alert("Failed to connect Phantom Wallet.");
        return null;
      }
    }

    return publicKey;
  };

  // ** Handle Payment in SOL **
  const handleBuyNow = useCallback(async () => {
    try {
      const walletAddress = await ensureWalletConnected();
      if (!walletAddress) return;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: walletAddress,
          toPubkey: RECIPIENT_WALLET,
          lamports: SALE_PRICE_USD * 1e9, // Convert USD to SOL (Adjust conversion rate)
        })
      );

      transaction.feePayer = walletAddress;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signedTransaction = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      alert("Payment Successful! Transaction ID: " + signature);
      console.log("Transaction confirmed:", signature);
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed: " + err.message);
    }
  }, []);

  // ** Handle Wallet Reconnection **
  const handleReconnectWallet = useCallback(async () => {
    try {
      await window.solana.disconnect();
      window.localStorage.clear();
      await window.solana.connect();
      alert("Wallet reconnected successfully!");
    } catch (err) {
      console.error("Error reconnecting wallet:", err);
      alert("Failed to reconnect wallet.");
    }
  }, []);

  return (
    <div className="product-list-container">
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/giveaways" className="nav-button">Airdrops</Link>
      </nav>

      <div className="vendor-header">
        <img src={vendorImage} alt="Coopers Glass" className="vendor-image" />
      </div>

      <div className="product-details card" style={{ textAlign: "center" }}>
        <img src={productImage} alt="Eagles XL Joystick Cropal Stick" className="product-image" />
        <h2>Eagles XL Joystick Cropal Stick</h2>
        <p><del>Retail: $115.00</del></p>
        <p>Claim: ${SALE_PRICE_USD.toFixed(2)}</p>
        <p>{claimPrice ? `≈ ${totalClaimAmount} $CLAIM` : "Loading..."}</p>

        {phantomUrl && <QRCode value={phantomUrl} size={180} />}

        <button onClick={handleBuyNow} className="buy-button">Buy Now</button>
        <button onClick={handleReconnectWallet} className="buy-button">Reconnect Wallet</button>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h3>How to Purchase</h3>
        <p>
          1) Scan the QR code with Phantom Wallet.<br />
          2) Approve the transaction.<br />
          3) After payment, confirm your order via email.<br />
        </p>
      </div>
    </div>
  );
};

export default EaglesXLJoystickCropalStick;

