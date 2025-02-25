import { Buffer } from "buffer"; // Import buffer
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
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
    const { select, connected, publicKey } = useWallet();
    const [phantomDetected, setPhantomDetected] = useState(false);
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

    // Detect Phantom Wallet
    useEffect(() => {
        if (window.solana && window.solana.isPhantom) {
            setPhantomDetected(true);
        }
    }, []);

    return (
        <div className="app-container">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                      <Link to="/" className="nav-button">Home</Link>
        <Link to="/referrals" className="nav-button">Buy $Claim Now (desktop)</Link>
        <Link to="/vendors" className="nav-button">Vendors</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/giveaways" className="nav-button">AirDrops & Giveaways</Link> {/* ✅ NEW BUTTON */}
                </div>
            </nav>

            <h1 className="title">Get Started with Reclaim</h1>

            <div className="step-container">
                {step === 1 && (
                    <div className="step-box">
                        <h2>Step 1: Install & Detect Phantom Wallet</h2>
                        {phantomDetected ? (
                            <>
                                <p className="success-text">✅ Phantom Wallet Detected!</p>
                                <button onClick={() => setStep(2)} style={buttonStyle("#6200EA")}>
                                    Continue to Step 2
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="error-text">🚨 Phantom Wallet Not Detected!</p>
                                <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" style={buttonStyle("#007BFF")}>
                                    Download Phantom Wallet
                                </a>
                            </>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="step-box">
                        <h2>Reclaim Token - Buy & Swap</h2>
                        <h3>Step 2: Connect Wallet & Buy SOL</h3>
                        <ul className="step-list">
                            <li>1️⃣ Click <b>Connect Wallet</b></li>
                            <li>2️⃣ Select <b>Phantom</b> and enter your password</li>
                            <li>3️⃣ If Phantom doesn’t open, <b>click the Phantom Ghost icon</b> in the <b>top-right of your browser extensions</b></li>
                            <li>4️⃣ Once open, click <b>"Buy"</b></li>
                            <li>5️⃣ Select <b>Solana (SOL)</b> and enter the amount</li>
                            <li>6️⃣ Complete your purchase and return here</li>
                        </ul>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {/* Always show connect wallet button */}
                            <button
                                onClick={() => select("Phantom")} // Forces Phantom popup every time
                                style={buttonStyle("#007BFF")}
                            >
                                Connect Wallet
                            </button>

                            {/* Show "I Bought SOL" button only AFTER wallet is connected */}
                            {connected && (
                                <button onClick={() => setStep(3)} style={buttonStyle("#28A745")}>
                                    ✅ I Bought SOL - Next Step
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-box">
                        <h2>Reclaim Token - Buy & Swap</h2>
                        <h3>Step 3: Swap SOL for $CLAIM</h3>
                        <ul className="step-list">
                            <li>1️⃣ Click <b>Open Jupiter</b></li>
                            <li>2️⃣ Click <b>Connect Wallet</b> in Jupiter</li>
                            <li>3️⃣ Select <b>Phantom (Ghost Icon)</b></li>
                            <li>4️⃣ Click <b>MAX</b> in the SOL section</li>
                            <li>5️⃣ Click <b>Swap</b> and confirm in Phantom</li>
                        </ul>
                        <button 
                            onClick={() => window.open("https://jup.ag/swap/SOL-EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4", "_blank")} 
                            style={buttonStyle("#FF9800")}
                        >
                            Open Jupiter
                        </button>
                        <p>🎉 Congrats! You Now Have $CLAIM!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

