import React, { useMemo, useState, useEffect } from "react";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import axios from "axios";
import "@solana/wallet-adapter-react-ui/styles.css"; // Default UI styles

export default function App() {
    const network = clusterApiUrl("mainnet-beta");
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const [step, setStep] = useState(1);

    return (
        <ConnectionProvider endpoint={network}>
            <WalletProvider wallets={wallets} autoConnect={false}>
                <WalletModalProvider>
                    <MainApp step={step} setStep={setStep} />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

function MainApp({ step, setStep }) {
    const { select, connected, disconnect, publicKey } = useWallet();
    const [phantomDetected, setPhantomDetected] = useState(false);
    const [referrer, setReferrer] = useState(null);

    useEffect(() => {
        if (window.solana && window.solana.isPhantom) {
            setPhantomDetected(true);
        }

        // Get referrer from URL
        const urlParams = new URLSearchParams(window.location.search);
        const storedRef = urlParams.get("ref");
        if (storedRef) {
            localStorage.setItem("referrer", storedRef);
            setReferrer(storedRef);
        }
    }, []);

    useEffect(() => {
        disconnect(); // Ensure wallet does NOT stay connected on refresh
    }, []);

    useEffect(() => {
        if (step === 2 && phantomDetected) {
            select("Phantom");
        }
    }, [step, phantomDetected, select]);

    useEffect(() => {
        if (connected && publicKey) {
            const userWallet = publicKey.toBase58();
            console.log(`✅ Connected Wallet: ${userWallet}`);

            // Send referral tracking data to backend
            axios.post("http://localhost:5000/api/track-referral", {
                referrer: localStorage.getItem("referrer"),
                referredUser: userWallet,
            })
            .then(response => console.log("✅ Referral Tracked:", response.data))
            .catch(error => console.error("❌ Error tracking referral:", error));
        }
    }, [connected, publicKey]);

    return (
        <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#121212", color: "white" }}>
            <h1>Reclaim Token - Buy & Swap</h1>

            {step === 1 && (
                <div>
                    <h2>Step 1: Install & Detect Phantom Wallet</h2>
                    {phantomDetected ? (
                        <>
                            <p style={{ color: "lightgreen" }}>✅ Phantom Wallet Detected!</p>
                            <button
                                onClick={() => setStep(2)}
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    backgroundColor: "#6200EA",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                            >
                                Continue to Step 2
                            </button>
                        </>
                    ) : (
                        <>
                            <p style={{ color: "red" }}>🚨 Phantom Wallet Not Detected!</p>
                            <a
                                href="https://phantom.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-block",
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    fontSize: "18px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "5px",
                                }}
                            >
                                Download Phantom Wallet
                            </a>
                        </>
                    )}
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Step 2: Connect Wallet & Buy SOL</h2>
                    <WalletMultiButton />

                    {connected && publicKey ? (
                        <p style={{ color: "lightgreen", marginTop: "10px" }}>
                            ✅ Connected: {publicKey.toBase58().slice(0, 6)}...
                        </p>
                    ) : (
                        <p style={{ color: "red", marginTop: "10px" }}>Waiting for wallet connection...</p>
                    )}

                    <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "400px", margin: "0 auto" }}>
                        <p style={{ color: "gray", fontSize: "14px" }}>
                            1️⃣ Click **Connect Wallet** <br />
                            2️⃣ Select **Phantom** and enter your password <br />
                            3️⃣ If Phantom doesn’t open, **click the Phantom Ghost icon** in the **top-right of your browser extensions** <br />
                            4️⃣ Once open, click **"Buy"** <br />
                            5️⃣ Select **Solana (SOL)** and enter the amount <br />
                            6️⃣ Complete your purchase and return here
                        </p>
                    </div>

                    <button
                        onClick={() => setStep(3)}
                        disabled={!connected}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            fontSize: "18px",
                            cursor: connected ? "pointer" : "not-allowed",
                            backgroundColor: connected ? "#28A745" : "#555",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        I Bought SOL - Next Step
                    </button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Step 3: Swap SOL for $CLAIM</h2>
                    <p style={{ color: "gray", fontSize: "14px", marginBottom: "20px" }}>
                        1️⃣ Click **Open Jupiter** <br />
                        2️⃣ Click **Connect Wallet** in Jupiter <br />
                        3️⃣ Select **Phantom (Ghost Icon)** <br />
                        4️⃣ Click **MAX** in the SOL section <br />
                        5️⃣ Click **Swap** and confirm in Phantom
                    </p>

                    <button
                        onClick={() => {
                            console.log("🔵 Open Jupiter button clicked!");

                            if (!publicKey) {
                                console.error("❌ No Wallet Connected!");
                                alert("Please connect your wallet first!");
                                return;
                            }

                            console.log("✅ Wallet Connected:", publicKey.toBase58());

                            axios.post("http://localhost:5000/api/track-click", {
                                referredUser: publicKey.toBase58(),
                            })
                            .then(response => console.log("✅ Referral Tracked:", response.data))
                            .catch(error => console.error("❌ Error tracking referral:", error));

                            const newTab = window.open("https://jup.ag/swap/SOL-EkuBwtKVU1x5N2z1VESqBTZFnsQuWuxyQt9LDGqkJsk4", "_blank", "noopener,noreferrer");
                            if (!newTab) {
                                alert("⚠️ Popup blocked! Please allow popups for this site.");
                            } else {
                                console.log("✅ Jupiter opened successfully!");
                            }
                        }}
                        style={{
                            display: "inline-block",
                            marginTop: "20px",
                            padding: "10px 20px",
                            fontSize: "18px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "5px",
                        }}
                    >
                        Open Jupiter
                    </button>

                    <p style={{ marginTop: "30px", fontSize: "20px", fontWeight: "bold", color: "#FFD700" }}>
                        🎉 Congrats! You Now Have $CLAIM!
                    </p>
                </div>
            )}
        </div>
    );
}


