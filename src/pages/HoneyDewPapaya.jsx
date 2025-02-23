import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { getClaimPrice } from "../components/TokenPrice";
import emailjs from "emailjs-com";
import "./ProductList.css";
import vendorImage from "../assets/gorillapackgenetics.webp";
import honeydewPapayaImage from "../assets/honeydewpapaya.jpg"; // Ensure this image exists in your assets folder

// Payment info
const recipientWallet = "2367uZx5WMJgMqpSyTLycN5Uhh1koZoC51Bw2gfypxpt";
const CLAIM_TOKEN_ADDRESS = "EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4";
const priceUSD = 50; // Price per item in USD

// List of US states for the dropdown (U.S. addresses)
const usStates = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" },
];

// EmailJS credentials
const serviceID = "service_c4kj8it";
const sellerTemplateID = "template_5rj6drh";  // Seller template remains the same
const buyerTemplateID = "template_3mus039";   // Buyer template remains the same
const publicKey = "BFAA9yJvj1yAllF9o";

const HoneyDewPapaya = () => {
  const [claimPrice, setClaimPrice] = useState(null);
  const [solanaPayURL, setSolanaPayURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [emailSent, setEmailSent] = useState(false);

  // Detailed shipping info (U.S. addresses only) + wallet snippet
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    usState: "",
    zip: "",
    walletSnippet: "",
  });

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

  // Generate the Solana Pay URL for HoneyDew Papaya
  useEffect(() => {
    if (claimPrice) {
      const totalUSD = priceUSD * quantity;
      const totalClaimAmount = (totalUSD / claimPrice).toFixed(6);
      // Update label and message to "HoneyDew Papaya"
      const url = `solana:${recipientWallet}?amount=${totalClaimAmount}&spl-token=${CLAIM_TOKEN_ADDRESS}&label=HoneyDew%20Papaya&message=Purchase%20of%20${quantity}%20HoneyDew%20Papaya`;
      setSolanaPayURL(url);
    }
  }, [claimPrice, quantity]);

  // Handle sending order confirmation emails (to seller & buyer)
  const handleSendConfirmation = () => {
    const { fullName, email, address1, city, usState, zip, walletSnippet } = orderDetails;
    if (!fullName || !email || !address1 || !city || !usState || !zip) {
      alert("Please fill out all required shipping details.");
      return;
    }
    if (!walletSnippet || walletSnippet.length !== 4) {
      alert("Please enter the first 2 and last 2 letters of your Solana wallet address (exactly 4 characters).");
      return;
    }

    const shippingAddress = `${address1}${orderDetails.address2 ? ", " + orderDetails.address2 : ""}, ${city}, ${usState} ${zip}`;
    const totalUSD = priceUSD * quantity;
    const totalCLAIM = claimPrice ? (totalUSD / claimPrice).toFixed(6) : "N/A";

    const templateParams = {
      from_name: fullName,
      email: email,
      shippingAddress: shippingAddress,
      product: "HoneyDew Papaya",
      quantity: quantity,
      totalUSD: totalUSD,
      totalCLAIM: totalCLAIM,
      solanaPayURL: solanaPayURL,
      walletSnippet: walletSnippet,
    };

    // Send email to seller
    emailjs.send(serviceID, sellerTemplateID, { ...templateParams, to_name: "Seller" }, publicKey)
      .then(() => {
        // Then send email to buyer
        return emailjs.send(serviceID, buyerTemplateID, { ...templateParams, to_name: fullName }, publicKey);
      })
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

      {/* Vendor Image */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Vendor" className="vendor-image" />
      </div>

      {/* Product Details Card (Centered) */}
      <div className="product-details card" style={{ textAlign: "center" }}>
        <img src={honeydewPapayaImage} alt="HoneyDew Papaya" className="product-image" />
        <h2 className="product-name">HoneyDew Papaya</h2>
        <p className="product-price">${priceUSD.toFixed(2)} USD each</p>

        {/* Quantity Selector */}
        <div className="quantity-container" style={{ margin: "1rem 0" }}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ marginLeft: "0.5rem", width: "60px" }}
          />
        </div>

        <p className="product-price">
          {loading
            ? "Loading $CLAIM price..."
            : claimPrice
              ? `≈ ${(priceUSD * quantity / claimPrice).toFixed(6)} $CLAIM`
              : "N/A"}
        </p>

        {/* QR Code Section */}
        {solanaPayURL ? (
          <QRCode value={solanaPayURL} size={180} />
        ) : (
          <p className="error-text">{error || "Generating QR Code..."}</p>
        )}
      </div>

      {/* Centered Instructions Right Below QR Code */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h3>How to Complete Your Purchase</h3>
        <p style={{ lineHeight: "1.6" }}>
          1) Scan the QR code above with your mobile camera or Phantom’s built-in scanner.<br />
          2) Complete the transaction in your Phantom Wallet.<br />
          3) After payment is completed, fill out the shipping details below (U.S. addresses only).<br />
          4) Enter the first 2 and last 2 letters of your Solana wallet address for confirmation.<br />
          5) Click <strong>Send Order Confirmation</strong> to notify the seller.
        </p>
      </div>

      {/* Order Form (Centered) */}
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
            <label>State</label>
            <select
              value={orderDetails.usState}
              onChange={(e) => setOrderDetails({ ...orderDetails, usState: e.target.value })}
            >
              <option value="">Select a State</option>
              {usStates.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
          <div className="order-form-field">
            <label>ZIP Code</label>
            <input
              type="text"
              value={orderDetails.zip}
              onChange={(e) => setOrderDetails({ ...orderDetails, zip: e.target.value })}
            />
          </div>
          <div className="order-form-field">
            <label>Wallet Confirmation (first 2 &amp; last 2 letters)</label>
            <input
              type="text"
              value={orderDetails.walletSnippet}
              onChange={(e) => setOrderDetails({ ...orderDetails, walletSnippet: e.target.value.trim() })}
              placeholder="e.g. abcd"
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

      {/* Telegram Support Link (Centered, Below Everything) */}
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

export default HoneyDewPapaya;
