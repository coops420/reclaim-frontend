import { useState, useEffect } from "react";
import axios from "axios";

const TOKEN_PAIR = "4vAxFw4b4cGEV7CzEcbWFJ38N3FTa1BxRM828xEzcxQR";
const DEXSCREENER_API_URL = `https://api.dexscreener.com/latest/dex/pairs/solana/${TOKEN_PAIR}`;
const DEX_LINK = `https://dexscreener.com/solana/${TOKEN_PAIR}`;

const TokenPrice = () => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                console.log("🔄 Fetching $CLAIM price from Dexscreener...");
                
                const response = await axios.get(DEXSCREENER_API_URL);
                console.log("🔎 Dexscreener API Response:", response.data);
                
                if (response.data && response.data.pairs && response.data.pairs.length > 0) {
                    const pairData = response.data.pairs.find(pair => pair.pairAddress === TOKEN_PAIR);
                    if (pairData && pairData.priceUsd) {
                        setPrice(pairData.priceUsd);
                    } else {
                        console.warn("⚠️ Token price not found in Dexscreener response.");
                    }
                } else {
                    console.warn("⚠️ No valid pairs found in Dexscreener response.");
                }
            } catch (error) {
                console.error("❌ Error fetching token price:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 30000); // Refresh every 30 sec
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="token-price-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="token-price" style={{ fontSize: "18px", fontWeight: "bold" }}>
                {loading ? "Loading..." : `$${price ? parseFloat(price).toFixed(6) : "N/A"} CLAIM`}
            </span>
            <a 
                href={DEX_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dex-link" 
                style={{ textDecoration: "none", backgroundColor: "#007BFF", color: "white", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold" }}
            >
                View on Dexscreener
            </a>
        </div>
    );
};

export default TokenPrice;
