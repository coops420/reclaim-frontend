import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { getClaimPrice } from "../components/TokenPrice";
import emailjs from "emailjs-com";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import "./ProductList.css";
import vendorImage from "../assets/coopersglass.jpg"; // Vendor image for Coopers Glass
import productImage from "../assets/eaglesXL.jpg"; // Eagles XL Joystick Cropal Stick image

// Payment info
const recipientWallet = "AfEanUHHtW1Eqos85FNUJCm7WSKr5PyeqneBt1PURRpW"; // Your recipient wallet address
const CLAIM_TOKEN_ADDRESS = "EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4"; // Your token mint address

// Prices for this product
const retailUSD = 115; // Retail price for display
const saleUSD = 85;    // Final sale (Claim) price

// EmailJS credentials and templates
const serviceID = "service_c4kj8it";
const sellerTemplateID = "cooper_au2yp3c"; // Dedicated seller template for Coopers Glass
const buyerTemplateID = "template_3mus039";
const publicKeyEmail = "BFAA9yJvj1yAllF9o";

// Create a connection to Devnet
const connection = new Connection("https://api.devnet.solana.com");

const EaglesXLJoystickCropalStick = () => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const [claimPrice, setClaimPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Fetch the current $CLAIM price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getClaimPrice();
        if (price) {
          setClaimPrice(price);
        } else {
          setError("Failed to load price. Try again later.");
        }
      } catch (err) {
        console.error("Error fetching $CLAIM price:", err);
        setError("Error loading price.");
      }
      setLoading(false);
    };
    fetchPrice();
  }, []);

  // Compute the token amount for the sale
  const totalClaimAmount = claimPrice ? (saleUSD / claimPrice).toFixed(6) : "N/A";

  // Construct the Phantom Universal Link URL
  const phantomUrl = `https://phantom.app/ul?app=YourAppName&recipient=${recipientWallet}&mint=${CLAIM_TOKEN_ADDRESS}&amount=${totalClaimAmount}&label=Eagles%20XL%20Joystick%20Cropal%20Stick&message=Purchase%20of%20Eagles%20XL%20Joystick%20Cropal%20Stick`;

  // Handle wallet reconnection (force a disconnect then reconnect)
  const handleReconnectWallet = useCallback(async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.disconnect();
        await window.solana.connect();
        alert("Wallet reconnected successfully!");
      } catch (err) {
        console.error("Error reconnecting wallet:", err);
        alert("Failed to reconnect wallet.");
      }
    } else {
      alert("Phantom wallet not found!");
    }
  }, []);

  // Handle sending order confirmation emails (unchanged)
  const handleSendConfirmation = () => {
    const formFields = document.querySelectorAll(".order-form input");
    const orderData = Array.from(formFields).reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  
    if (
      !orderData.fullName ||
      !orderData.email ||
      !orderData.address1 ||
      !orderData.city ||
      !orderData.stateProvince ||
      !orderData.postalCode ||
      !orderData.country
    ) {
      alert("Please fill out all required shipping details.");
      return;
    }
  
    const shippingAddress = `${orderData.address1}${
      orderData.address2 ? ", " + orderData.address2 : ""
    }, ${orderData.city}, ${orderData.stateProvince}, ${orderData.postalCode}, ${orderData.country}`;
  
    const totalUSD = saleUSD;
    const totalCLAIM = claimPrice ? (saleUSD / claimPrice).toFixed(6) : "N/A";
  
    const templateParams = {
      from_name: orderData.fullName,
      email: orderData.email,
      shippingAddress,
      product: "Eagles XL Joystick Cropal Stick",
      totalUSD,
      totalCLAIM,
      solanaPayURL: phantomUrl,
    };
  
    emailjs
      .send(
        serviceID,
        sellerTemplateID,
        { ...templateParams, to_name: "Seller", seller_email: "moviezzy@hotmail.com" },
        publicKeyEmail
      )
      .then(() =>
        emailjs.send(
          serviceID,
          buyerTemplateID,
          { ...templateParams, to_name: orderData.fullName },
          publicKeyEmail
        )
      )
      .then(() => {
        alert("Order confirmation sent to both seller and buyer!");
        setEmailSent(true);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Failed to send order confirmation.");
      });
  };

  return (
    <div className="product-list-container">
      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>
  
      {/* Vendor Header */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Coopers Glass" className="vendor-image" />
      </div>
  
      {/* Product Details Card */}
      <div className="product-details card" style={{ textAlign: "center" }}>
        <img src={productImage} alt="Eagles XL Joystick Cropal Stick" className="product-image" />
        <h2 className="product-name">Eagles XL Joystick Cropal Stick</h2>
        <p className="product-retail-price"><del>Retail: $115.00</del></p>
        <p className="product-sale-price">Claim: $85.00</p>
        <p className="product-price">
          {loading
            ? "Loading $CLAIM price..."
            : claimPrice
            ? `≈ ${totalClaimAmount} $CLAIM`
            : "N/A"}
        </p>
  
        {/* QR Code Section */}
        {phantomUrl && <QRCode value={phantomUrl} size={180} />}
  
        {/* Buy Now Button */}
        <div style={{ margin: "1rem 0" }}>
          {phantomUrl && (
            <a
              href={phantomUrl}
              className="buy-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          )}
        </div>
  
        {/* Reconnect Wallet Button */}
        <div style={{ margin: "1rem 0" }}>
          <button onClick={handleReconnectWallet} className="buy-button">
            Reconnect Wallet
          </button>
        </div>
      </div>
  
      {/* Purchase Instructions */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h3>How to Complete Your Purchase</h3>
        <p style={{ lineHeight: "1.6" }}>
          1) Scan the QR code above with your mobile camera or Phantom’s built-in scanner.<br />
          2) Complete the transaction in your Phantom Wallet.<br />
          3) After payment is completed, fill out the shipping details below (global addresses accepted).<br />
          4) Click <strong>Send Order Confirmation</strong> to notify the seller.
        </p>
      </div>
  
      {/* Order Form */}
      <div className="order-instructions card" style={{ textAlign: "center" }}>
        <div className="order-form">
          <div className="order-form-field">
            <label>Full Name (required)</label>
            <input
              type="text"
              name="fullName"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>Email (required)</label>
            <input
              type="email"
              name="email"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>Street Address (Line 1)</label>
            <input
              type="text"
              name="address1"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>Address Line 2 (Apt, Suite, etc.)</label>
            <input
              type="text"
              name="address2"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>State/Province</label>
            <input
              type="text"
              name="stateProvince"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>Postal/ZIP Code</label>
            <input
              type="text"
              name="postalCode"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="order-form-field">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value=""
              onChange={() => {}}
            />
          </div>
          <button
            className="send-confirmation-btn"
            onClick={handleSendConfirmation}
            disabled={emailSent}
          >
            {emailSent ? "Confirmation Sent" : "Send Order Confirmation"}
          </button>
        </div>
      </div>
  
      {/* Telegram Support Link */}
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <p>
          If having trouble or need help, join&nbsp;
          <a
            href="https://t.me/reclaimtoken"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a4aff", textDecoration: "underline" }}
          >
            t.me/reclaimtoken
          </a>.
        </p>
      </div>
    </div>
  );
};

export default EaglesXLJoystickCropalStick;
