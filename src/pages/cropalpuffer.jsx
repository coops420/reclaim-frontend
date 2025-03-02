import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { getClaimPrice } from "../components/TokenPrice"; // Fetch live $CLAIM price
import "./ProductList.css";
import vendorImage from "../assets/coopersglass.jpg";
import productImage from "../assets/blackcropalpuffer.jpg"; // import emailjs from "emailjs-com";

// ** ✅ QUICKNODE RPC URL **
const QUICKNODE_RPC_URL =
  "https://blissful-responsive-general.solana-mainnet.quiknode.pro/d5b8fc8baeac551f6fcad8f278dcd3364f5d3aff/";
const connection = new Connection(QUICKNODE_RPC_URL, "confirmed");

// ** RECIPIENT WALLET (SELLER) **
const RECIPIENT_WALLET = new PublicKey("AfEanUHHtW1Eqos85FNUJCm7WSKr5PyeqneBt1PURRpW");

// ** CLAIM Token Mint Address **
const CLAIM_TOKEN_MINT = new PublicKey("EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4");

// ** PRICING CONFIG (Sonic Crushed Opal Puffer) **
const PRODUCT_PRICE_USD = 275; // Final claim price in USD
const RETAIL_PRICE_USD = 350;  // Original retail for display

// ** EmailJS credentials and templates
const serviceID         = "service_c4kj8it";
const sellerTemplateID  = "cooper_au2yp3c";
const buyerTemplateID   = "template_3mus039";
const publicKeyEmail    = "BFAA9yJvj1yAllF9o";

const CoopersGlassProduct5 = () => {
  const { publicKey } = useWallet();

  const [claimPrice, setClaimPrice] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [emailSent, setEmailSent]   = useState(false);

  // Shipping details
  const [orderDetails, setOrderDetails] = useState({
    fullName:      "",
    email:         "",
    address1:      "",
    address2:      "",
    city:          "",
    stateProvince: "",
    postalCode:    "",
    country:       "",
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
  const CLAIM_AMOUNT = claimPrice && claimPrice > 0
    ? (PRODUCT_PRICE_USD / claimPrice).toFixed(6)
    : null;
  const isReadyToBuy = CLAIM_AMOUNT !== null && !isNaN(CLAIM_AMOUNT) && CLAIM_AMOUNT > 0;

  // ** EXACT BUY LOGIC with forced shipping check + email after success
  const handleBuyNow = useCallback(async () => {
    // 1) Make sure shipping details are filled
    const { fullName, email, address1, address2, city, stateProvince, postalCode, country } = orderDetails;
    if (!fullName || !email || !address1 || !city || !stateProvince || !postalCode || !country) {
      alert("Please fill out all required shipping details first!");
      return;
    }

    try {
      // 2) Ensure wallet is connected
      const ensureWalletConnected = async () => {
        if (!window.solana || !window.solana.isPhantom) {
          alert("Please install Phantom Wallet.");
          return null;
        }
        if (!publicKey) {
          console.log("Reconnecting Phantom Wallet...");
          const wallet = await window.solana.connect();
          return wallet.publicKey;
        }
        return publicKey;
      };

      const walletAddress = await ensureWalletConnected();
      if (!walletAddress) return;

      console.log("Fetching latest blockhash...");
      const latestBlockhash = await connection.getLatestBlockhash("finalized");
      if (!latestBlockhash.blockhash) {
        alert("Failed to get a valid blockhash. Try again.");
        return;
      }
      console.log("Blockhash fetched:", latestBlockhash.blockhash);

      // Associated token accounts
      const senderTokenAccount   = await getAssociatedTokenAddress(CLAIM_TOKEN_MINT, walletAddress);
      const receiverTokenAccount = await getAssociatedTokenAddress(CLAIM_TOKEN_MINT, RECIPIENT_WALLET);

      // Ensure buyer has $CLAIM token account
      try {
        await getAccount(connection, senderTokenAccount);
      } catch (err) {
        alert("You do not have a $CLAIM token account. Please receive some $CLAIM first.");
        return;
      }

      // If recipient’s token account missing, create it
      let recipientAccountCreated = false;
      try {
        await getAccount(connection, receiverTokenAccount);
      } catch (err) {
        console.log("Creating recipient's associated token account...");

        const createAccountTransaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            walletAddress,
            receiverTokenAccount,
            RECIPIENT_WALLET,
            CLAIM_TOKEN_MINT
          )
        );

        createAccountTransaction.recentBlockhash = latestBlockhash.blockhash;
        createAccountTransaction.feePayer        = walletAddress;

        console.log("Requesting Phantom confirmation to create recipient token account...");
        const { signature } = await window.solana.signAndSendTransaction(createAccountTransaction);
        console.log("Recipient's token account created:", signature);
        recipientAccountCreated = true;
      }

      // Convert $CLAIM to lamports
      const claimAmountInLamports = BigInt(Number(CLAIM_AMOUNT) * 10 ** 6);

      // If ATA was created, fetch fresh blockhash
      if (recipientAccountCreated) {
        console.log("Fetching fresh blockhash for token transfer...");
        const newBlockhash = await connection.getLatestBlockhash("finalized");
        latestBlockhash.blockhash = newBlockhash.blockhash;
      }

      // Create the SPL token transfer transaction
      console.log(`Requesting Phantom Wallet confirmation to send ${CLAIM_AMOUNT} $CLAIM...`);
      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount,
          receiverTokenAccount,
          walletAddress,
          claimAmountInLamports,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer        = walletAddress;

      const { signature } = await window.solana.signAndSendTransaction(transaction);

      alert(`Payment Successful! Sent ${CLAIM_AMOUNT} $CLAIM.\nTransaction ID: ${signature}`);
      console.log("Transaction confirmed:", signature);

      // 3) Immediately send emails w/ shipping info after successful payment
      const shippingAddress = `${address1}${address2 ? ", " + address2 : ""}, ${city}, ${stateProvince}, ${postalCode}, ${country}`;

      // Build EmailJS template params
      const templateParams = {
        from_name:    fullName,
        email,
        shippingAddress,
        product:      "Sonic Crushed Opal Puffer", // Updated product name
        totalUSD:     PRODUCT_PRICE_USD,
        totalCLAIM:   CLAIM_AMOUNT,
      };

      // Send to seller, then buyer
      emailjs
        .send(
          serviceID,
          sellerTemplateID,
          { ...templateParams, to_name: "Seller", seller_email: "moviezzy@hotmail.com" },
          publicKeyEmail
        )
        .then(() => emailjs.send(
          serviceID,
          buyerTemplateID,
          { ...templateParams, to_name: fullName },
          publicKeyEmail
        ))
        .then(() => {
          alert("Order confirmation sent to both seller and buyer!");
          setEmailSent(true);
        })
        .catch((err) => {
          console.error("FAILED to send email confirmations...", err);
          alert("Failed to send order confirmation.");
        });
    } catch (err) {
      console.error("Transaction or email logic failed:", err);
      alert("Transaction or email logic failed: " + err.message);
    }
  }, [CLAIM_AMOUNT, orderDetails, publicKey]);

  return (
    <div className="product-list-container">
      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link>
      </nav>

      {/* Vendor Header */}
      <div className="vendor-header">
        <img src={vendorImage} alt="Coopers Glass" className="vendor-image" />
      </div>

      {/* Product Details Card */}
      <div className="product-details card" style={{ textAlign: "center" }}>
        <img
          src={productImage}
          alt="Crushed Opal Puffer" /* Updated alt text */
          className="product-image"
        />
        <h2>Sonic Crushed Opal Puffer</h2> {/* Updated title */}
        <p><del>Retail: ${RETAIL_PRICE_USD}</del></p> {/* Now 350 */}
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

        {/* Buy Now Button (requires shipping + correct price) */}
        <button
          onClick={handleBuyNow}
          className="buy-button"
          disabled={!isReadyToBuy}
        >
          {isReadyToBuy ? "Buy Now" : "Loading Price..."}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h3>How to Complete Your Purchase</h3>
        <p style={{ lineHeight: "1.6" }}>
          1) Fill out the required shipping details above.
          <br />
          2) Click <strong>Buy Now</strong> to pay with Phantom.
          <br />
          3) After a successful payment, confirmation emails will be sent automatically.
          <br />
        </p>
 <p style={{ lineHeight: "1.6", marginTop: "1rem", fontStyle: "italic" }}>
          We’ve noticed that Phantom Wallet may display a warning when making purchases on our site. This is due to automated security filters, not because our site is unsafe. If you prefer, you can manually send payment via DM or just create a fresh wallet for purchase if worried!
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

export default CoopersGlassProduct5;
