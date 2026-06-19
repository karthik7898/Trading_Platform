import { useState, useRef } from "react";
import API from "../services/api";
import "../styles/market.css";

const AVAILABLE_STOCKS = [
  { symbol: "MSFT", price: 425.50, change: 2.4, cap: "3.2T" },
  { symbol: "AAPL", price: 182.75, change: 1.8, cap: "2.9T" },
  { symbol: "GOOG", price: 142.30, change: 3.1, cap: "1.8T" },
  { symbol: "AMZN", price: 198.95, change: -0.5, cap: "2.1T" },
  { symbol: "META", price: 565.40, change: 5.2, cap: "1.6T" },
  { symbol: "TSLA", price: 248.70, change: -2.1, cap: "875B" },
];

export default function Market() {
  const userId = localStorage.getItem("userId");
  const formRef = useRef(null);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!symbol || !quantity) {
      alert("Enter symbol and quantity");
      return;
    }

    try {
      const res = await API.post("/trading/buy", {
        userId,
        symbol,
        quantity: Number(quantity),
      });

      setMessage(
        `✅ Bought ${res.data.quantity} ${res.data.symbol} @ ₹${res.data.pricePerStock.toFixed(
          2
        )}`
      );
      setSymbol("");
      setQuantity("");
    } catch (err) {
      alert(err.response?.data?.message || "Buy failed");
    }
  };

  return (
    <div className="market-container">
      <div className="market-header">
        <h1>📈 Explore Market</h1>
        <p>Buy stocks and grow your portfolio</p>
      </div>

      {/* AVAILABLE STOCKS */}
      <div className="market-stocks-grid">
        {AVAILABLE_STOCKS.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <div className="stock-header">
              <h3 className="stock-symbol">{stock.symbol}</h3>
              <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '📈' : '📉'} {Math.abs(stock.change)}%
              </span>
            </div>
            <div className="stock-price">₹{stock.price.toFixed(2)}</div>
            <div className="stock-meta">
              <div className="meta-item">
                <span className="meta-label">Market Cap</span>
                <span className="meta-value">{stock.cap}</span>
              </div>
            </div>
            <button
              className="stock-select-btn"
              onClick={() => {
                setSymbol(stock.symbol);
                setTimeout(() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }}
            >
              Buy {stock.symbol}
            </button>
          </div>
        ))}
      </div>

      {/* BUY FORM */}
      <div className="market-form" ref={formRef}>
        <h2>Place Order</h2>
        <div className="form-group">
          <input
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="form-input"
          />

          <input
            placeholder="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
          />

          <button onClick={handleBuy} className="buy-btn">
            💰 BUY STOCK
          </button>
        </div>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
}
