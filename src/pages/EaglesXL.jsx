import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { getClaimPrice } from "../components/TokenPrice";
import emailjs from "emailjs-com";
import "./ProductList.css";
import vendorImage from "../assets/coopersglass.jpg"; // Vendor image for Coopers Glass
import productImage from "../assets/eaglesXL.jpg"; // Eagles XL Joystick Cropal Stick image

// Payment info
const recipientWallet = "AfEanUHHtW1Eqos85FNUJCm7WSKr5PyeqneBt1PURRpW"; // Updated wallet
const CLAIM_TOKEN_ADDRESS = "EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4";

// Prices for this product
const retailUSD = 115; // Retail price for display
const saleUSD = 85;    // Final sale (Claim) price

// EmailJS credentials and templates
const serviceID = "service_c4kj8it";
const sellerTemplateID = "cooper_au2yp3c"; // Dedicated seller template for Coopers Glass
const buyerTemplateID = "template_3mus039";
const publicKey = "BFAA9yJvj1yAllF9o";

const EaglesXLJoystickCropalStick = () => {
  const [claimPrice, setClaimPrice] = useState(null);
  const [solanaPayURL, setSolanaPayURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Shipping details state for global addresses
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
  });

  // 1) Fetch the current $CLAIM price
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

  // 2) Generate the Solana Pay URL using the sale price (85 USD)
  useEffect(() => {
    if (claimPrice) {
      const totalClaimAmount = (saleUSD / claimPrice).toFixed(6);
      const url = `solana:${recipientWallet}?amount=${totalClaimAmount}&spl-token=${CLAIM_TOKEN_ADDRESS}&label=Eagles%20XL%20Joystick%20Cropal%20Stick&message=Purchase%20of%20Eagles%20XL%20Joystick%20Cropal%20Stick`;
      setSolanaPayURL(url);
    }
  }, [claimPrice]);

  // 3) Handle sending order confirmation emails
  const handleSendConfirmation = () => {
    const { fullName, email, address1, address2, city, stateProvince, postalCode, country } = orderDetails;
    if (!fullName || !email || !address1 || !city || !stateProvince || !postalCode || !country) {
      alert("Please fill out all required shipping details.");
      return;
    }
    const shippingAddress = `${address1}${address2 ? ", " + address2 : ""}, ${city}, ${stateProvince}, ${postalCode}, ${country}`;
    const totalUSD = saleUSD;
    const totalCLAIM = claimPrice ? (saleUSD / claimPrice).toFixed(6) : "N/A";

    const templateParams = {
      from_name: fullName,
      email,
      shippingAddress,
      product: "Eagles XL Joystick Cropal Stick",
      totalUSD,
      totalCLAIM,
      solanaPayURL,
    };

    emailjs
      .send(
        serviceID,
        sellerTemplateID,
        { ...templateParams, to_name: "Seller", seller_email: "moviezzy@hotmail.com" },
        publicKey
      )
      .then(() =>
        emailjs.send(
          serviceID,
          buyerTemplateID,
          { ...templateParams, to_name: fullName },
          publicKey
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
            ? `≈ ${(saleUSD / claimPrice).toFixed(6)} $CLAIM`
            : "N/A"}
        </p>
        {/* QR Code Section */}
        {solanaPayURL ? (
          <QRCode value={solanaPayURL} size={180} />
        ) : (
          <p className="error-text">{error || "Generating QR Code..."}</p>
        )}
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
              value={orderDetails.fullName}
              onChange={(e) => setOrderDetails({ ...orderDetails, fullName: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Email (required)</label>
            <input
              type="email"
              value={orderDetails.email}
              onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Street Address (Line 1)</label>
            <input
              type="text"
              value={orderDetails.address1}
              onChange={(e) => setOrderDetails({ ...orderDetails, address1: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Address Line 2 (Apt, Suite, etc.)</label>
            <input
              type="text"
              value={orderDetails.address2}
              onChange={(e) => setOrderDetails({ ...orderDetails, address2: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>City</label>
            <input
              type="text"
              value={orderDetails.city}
              onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>State/Province</label>
            <input
              type="text"
              value={orderDetails.stateProvince}
              onChange={(e) => setOrderDetails({ ...orderDetails, stateProvince: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Postal/ZIP Code</label>
            <input
              type="text"
              value={orderDetails.postalCode}
              onChange={(e) => setOrderDetails({ ...orderDetails, postalCode: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Country</label>
            <input
              type="text"
              value={orderDetails.country}
              onChange={(e) => setOrderDetails({ ...orderDetails, country: e.target.value })}
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
