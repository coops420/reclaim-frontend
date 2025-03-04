import { Buffer } from "buffer"; // Import buffer
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

// Ensure buffer is available globally
if (!window.Buffer) {
    window.Buffer = Buffer;
}

const buttonStyle = (color) => ({
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
    transition: "background 0.3s",
});

export default function Referrals() {
    const location = useLocation();
    const [step, setStep] = useState(1);

    // Extract referral name from URL (supports both pathname and query parameters)
    useEffect(() => {
        const pathSegments = location.pathname.split("/");
        let referrer = pathSegments.length > 2 ? pathSegments[2] : null;
        
        // Check if referral is passed as a query parameter (e.g., ?ref=coops)
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has("ref")) {
            referrer = searchParams.get("ref");
        }

        if (referrer) {
            localStorage.setItem("referrer", referrer);
            console.log(`✅ Referral stored: ${referrer}`);
        }
    }, [location]);

    return (
        <div className="app-container">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/" className="nav-button">Home</Link>
                    <Link to="/referrals" className="nav-button">Buy $Claim</Link>
                    <Link to="/vendors" className="nav-button">Shop</Link>
                    <Link to="/about" className="nav-button">About Us</Link>
                    <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link> {/* ✅ NEW BUTTON */}
                </div>
            </nav>

            <h1 className="title">Get Started with Reclaim</h1>

            <div className="step-container">
                {step === 1 && (
                    <div className="step-box">
                        <h2>Step 1: Download Phantom Wallet (Playstore/Link Below)</h2>
                        <p className="info-text">
                            If you haven't already installed it,
                            do so now and continue to step 2:
                        </p>
                        <a
                            href="https://phantom.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={buttonStyle("#007BFF")}
                        >
                            Download Phantom Wallet
                        </a>
                        <button onClick={() => setStep(2)} style={buttonStyle("#6200EA")}>
                            Continue to Step 2
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-box">
                        <h2>Reclaim Token - Buy & Swap</h2>
                        <h3>Step 2: Buy Solana</h3>
                        <ul className="step-list">
                            <li>1️⃣ Open your Phantom Wallet.(app on mobile, top right in extensions on desktops.</li>
                            <li>2️⃣ Click <b>"Buy"</b> to purchase Solana. Put the USD amount needed.</li>
                            <li>3️⃣ Complete your purchase using payment type wanted and return here.</li>
                        </ul>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <button onClick={() => setStep(3)} style={buttonStyle("#28A745")}>
                                ✅ I Bought SOL - Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-box">
                        <h2>Reclaim Token - Buy & Swap</h2>
                        <h3>Step 3: Swap Solana for RECLAIM</h3>
                        <ul className="step-list">
                            <li>1️⃣ Click <b>Phantom</b> again to open it</li>
                            <li>2️⃣ Click <b>Swap</b> middle top icon.</li>
                            <li>3️⃣ Select <b>Solana</b> for the top coin</li>
                            <li>4️⃣ Select <b>Reclaim</b>  or put <b>EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4</b> in the Bottom coin to bring it right to Reclaim</li>
                            <li>5️⃣ Click  <b>MAX</b> then click <b>Swap</b> and confirm in Phantom</li>
                        </ul>
             <p>🎉 Congrats! You Now Have $CLAIM!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
