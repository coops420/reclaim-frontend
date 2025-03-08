import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getClaimPrice } from "../components/TokenPrice"; // Fetch live $CLAIM price
import "./ProductList.css";
import vendorImage from "../assets/coopersglass.jpg";
import productImage from "../assets/eaglesXL.jpg";
import emailjs from "emailjs-com";

// ** ✅ QUICKNODE RPC URL **
const QUICKNODE_RPC_URL =
  "https://blissful-responsive-general.solana-mainnet.quiknode.pro/d5b8fc8baeac551f6fcad8f278dcd3364f5d3aff/";
const connection = new Connection(QUICKNODE_RPC_URL, "confirmed");

// ** RECIPIENT WALLET (SELLER) **
const RECIPIENT_WALLET = new PublicKey("AfEanUHHtW1Eqos85FNUJCm7WSKr5PyeqneBt1PURRpW");

// ** CLAIM Token Mint Address **
const CLAIM_TOKEN_MINT = new PublicKey("EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4");

// ** PRICING CONFIG (Joystick) **
const PRODUCT_PRICE_USD = 85; // Claim price in USD
const RETAIL_PRICE_USD = 115; // Original retail for display

// ** EmailJS credentials and templates
const serviceID = "service_c4kj8it";
const sellerTemplateID = "cooper_au2yp3c";
const buyerTemplateID = "template_3mus039";
const publicKeyEmail = "BFAA9yJvj1yAllF9o";

const JoystickPurchase = () => {
  const [claimPrice, setClaimPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Shipping details
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

  // ** Fetch $CLAIM price once
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await getClaimPrice();
        if (price) {
          setClaimPrice(price);
        } else {
          setError("Failed to load $CLAIM price. Try again later.");
        }
      } catch (err) {
        console.error("Error fetching $CLAIM price:", err);
        setError("Error loading price.");
      }
      setLoading(false);
    };
    fetchPrice();
  }, []);

  // ** Compute how much $CLAIM is needed
  const CLAIM_AMOUNT =
    claimPrice && claimPrice > 0 ? (PRODUCT_PRICE_USD / claimPrice).toFixed(6) : null;
  const isReadyToBuy = CLAIM_AMOUNT !== null && !isNaN(CLAIM_AMOUNT) && CLAIM_AMOUNT > 0;

  // Prepare QR code data
  const qrData = isReadyToBuy
    ? `Product: Eagles XL Joystick Cropal Stick
USD Price: $${PRODUCT_PRICE_USD}
$CLAIM Amount: ${CLAIM_AMOUNT}`
    : "Loading payment details...";

  // Email sending function activated when the button is pressed.
  const handleSendEmail = () => {
    const { fullName, email, address1, city, stateProvince, postalCode, country } = orderDetails;
    if (!fullName || !email || !address1 || !city || !stateProvince || !postalCode || !country) {
      alert("Please fill out all required shipping details first!");
      return;
    }

    const shippingAddress = `${address1}${orderDetails.address2 ? ", " + orderDetails.address2 : ""}, ${city}, ${stateProvince}, ${postalCode}, ${country}`;

    const templateParams = {
      from_name: fullName,
      email,
      shippingAddress,
      product: "Eagles XL Joystick Cropal Stick",
      totalUSD: PRODUCT_PRICE_USD,
      totalCLAIM: CLAIM_AMOUNT,
    };

    // Send to seller, then buyer
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
          { ...templateParams, to_name: fullName },
          publicKeyEmail
        )
      )
      .then(() => {
        alert("Order confirmation sent to both seller and buyer!");
        setEmailSent(true);
      })
      .catch((err) => {
        console.error("Failed to send email confirmations...", err);
        alert("Failed to send order confirmation.");
      });
  };

  return (
    <div className="product-list-container">
      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/vendors" className="nav-button">
          Vendors
        </Link>
        <Link to="/about" className="nav-button">
          About
        </Link>
        <Link to="/giveaways" className="nav-button">
          AirDrops & Giveaways
        </Link>
      </nav>

      {/* Vendor Header */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Coopers Glass" className="vendor-image" />
      </div>

      {/* Product Details Card */}
      <div className="product-details card" style={{ textAlign: "center" }}>
        <img
          src={productImage}
          alt="Eagles XL Joystick Cropal Stick"
          className="product-image"
        />
        <h2>Eagles XL Joystick Cropal Stick</h2>
        <p>
          <del>Retail: ${RETAIL_PRICE_USD}</del>
        </p>
        <p>
          {loading
            ? "Loading $CLAIM price..."
            : claimPrice
            ? `${PRODUCT_PRICE_USD} USD ≈ ${CLAIM_AMOUNT} $CLAIM`
            : "N/A"}
        </p>

        {/* 2-column Shipping Form */}
        <div
          className="order-form"
          style={{
            margin: "1rem 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "1rem",
            rowGap: "1rem",
          }}
        >
          <div>
            <label>Full Name (required)</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email (required)</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Street Address (Line 1)</label>
            <input
              type="text"
              placeholder="123 Main St"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, address1: e.target.value })
              }
            />
          </div>
          <div>
            <label>Address Line 2 (Apt, Suite, etc.)</label>
            <input
              type="text"
              placeholder="Apt #"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, address2: e.target.value })
              }
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, city: e.target.value })
              }
            />
          </div>
          <div>
            <label>State/Province</label>
            <input
              type="text"
              placeholder="State/Province"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, stateProvince: e.target.value })
              }
            />
          </div>
          <div>
            <label>Postal/ZIP Code</label>
            <input
              type="text"
              placeholder="12345"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, postalCode: e.target.value })
              }
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              placeholder="USA"
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, country: e.target.value })
              }
            />
          </div>
        </div>

        {/* QR Code Display */}
        {isReadyToBuy && (
          <div style={{ margin: "1rem auto", width: "fit-content" }}>
            <QRCode value={qrData} />
            <p style={{ marginTop: "0.5rem" }}>Scan to view your payment details</p>
          </div>
        )}

        {/* Email Confirmation Button */}
        <button onClick={handleSendEmail} className="buy-button">
          Send Confirmation Email
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h3>How to Complete Your Purchase</h3>
        <p style={{ lineHeight: "1.6" }}>
          1) Fill out the required shipping details above.
          <br />
          2) Scan the QR code to view your payment details.
          <br />
          3) Follow your wallet app instructions to complete the payment.
          <br />
          4) Click the button above to send the order confirmation email.
        </p>
        <p
          style={{
            lineHeight: "1.6",
            marginTop: "1rem",
            fontStyle: "italic",
          }}
        >
          We’ve noticed that Phantom Wallet may display a warning when making
          purchases on our site. This is due to automated security filters, not
          because our site is unsafe. If you prefer, you can manually send payment
          via DM or just create a fresh wallet for purchase if worried!
        </p>
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

export default JoystickPurchase;



