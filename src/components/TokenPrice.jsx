import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TokenPrice() {
  const [tokenPrice, setTokenPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const dexScreenerUrl = "https://dexscreener.com/solana/4vAxFw4b4cGEV7CzEcbWFJ38N3FTa1BxRM828xEzcxQR";

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=claim-token&vs_currencies=usd"
        );

        if (response.data["claim-token"]?.usd) {
          setTokenPrice(response.data["claim-token"].usd);
        } else {
          console.warn("⚠️ Token price not found. Using DEX link.");
        }
      } catch (error) {
        console.error("❌ Error fetching token price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update price every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.priceContainer}>
      <span style={styles.priceText}>
        {loading ? "Loading..." : tokenPrice ? `$${tokenPrice.toFixed(4)}` : "Price Unavailable"}
      </span>
      <a href={dexScreenerUrl} target="_blank" rel="noopener noreferrer" style={styles.dexLink}>
        View on DexScreener
      </a>
    </div>
  );
}

const styles = {
  priceContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    padding: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 212, 255, 0.4)",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#00d4ff",
  },
  priceText: {
    fontFamily: "'Orbitron', sans-serif",
  },
  dexLink: {
    textDecoration: "none",
    color: "#00d4ff",
    fontWeight: "bold",
  },
};
