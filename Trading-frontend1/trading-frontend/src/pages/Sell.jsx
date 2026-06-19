import { useState, useEffect, useRef, useCallback } from "react";
import API from "../services/api";
import "../styles/sell.css";

export default function Sell() {
  const userId = localStorage.getItem("userId");
  const formRef = useRef(null);

  const [portfolio, setPortfolio] = useState([]);
  const [prices, setPrices] = useState({});
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPortfolio = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await API.get(`/trading/portfolio/${userId}`);
      setPortfolio(res.data || []);

      // Fetch live prices for each stock
      if (res.data && res.data.length > 0) {
        res.data.forEach(async (item) => {
          try {
            const priceRes = await API.get(`/stocks/price/${item.symbol}`);
            setPrices((prev) => ({
              ...prev,
              [item.symbol]: priceRes.data,
            }));
          } catch (err) {
            console.error(`Failed to load price for ${item.symbol}`);
          }
        });
      }
    } catch (err) {
      alert("Failed to load portfolio");
      setPortfolio([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadPortfolio();
  }, [userId, loadPortfolio]);

  const handleSell = async () => {
    if (!symbol || !quantity) {
      alert("Select stock and enter quantity");
      return;
    }

    try {
      const res = await API.post("/trading/sell", {
        userId,
        symbol,
        quantity: Number(quantity),
      });

      setMessage(
        `✅ Sold ${res.data.quantity} ${res.data.symbol} @ ₹${res.data.pricePerStock.toFixed(
          2
        )}`
      );
      setSymbol("");
      setQuantity("");

      // Reload portfolio
      loadPortfolio();
    } catch (err) {
      alert(err.response?.data?.message || "Sell failed");
    }
  };

  const formatCurrency = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? `₹${n.toFixed(2)}` : "—";
  };

  const selectedStock = portfolio.find((p) => p.symbol === symbol);
  const selectedPrice = prices[symbol] || 0;
  const maxQty = selectedStock ? selectedStock.quantity : 0;

  return (
    <div className="sell-container">
      <div className="sell-header">
        <h1>📉 Sell Stocks</h1>
        <p>Convert your holdings back to cash</p>
      </div>

      {loading ? (
        <div className="loading">Loading portfolio...</div>
      ) : portfolio.length === 0 ? (
        <div className="no-stocks">
          <p>📭 No stocks in your portfolio to sell</p>
          <p>Start buying stocks first!</p>
        </div>
      ) : (
        <>
          {/* PORTFOLIO HOLDINGS */}
          <div className="portfolio-grid">
            {portfolio.map((stock) => {
              const price = prices[stock.symbol] || 0;
              const total = price * stock.quantity;

              return (
                <div
                  key={stock.symbol}
                  className={`holding-card ${symbol === stock.symbol ? "active" : ""}`}
                  onClick={() => setSymbol(stock.symbol)}
                >
                  <div className="holding-header">
                    <h3 className="stock-symbol">{stock.symbol}</h3>
                    <span className="holding-qty">Qty: {stock.quantity}</span>
                  </div>
                  <div className="holding-price">
                    {price > 0 ? formatCurrency(price) : "Loading..."}
                  </div>
                  <div className="holding-total">
                    Total: {formatCurrency(total)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* SELL FORM */}
          <div className="sell-form" ref={formRef}>
            <h2>Place Sell Order</h2>
            <div className="form-group">
              <label>Select Stock to Sell</label>
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="form-select"
              >
                <option value="">Choose a stock...</option>
                {portfolio.map((p) => (
                  <option key={p.symbol} value={p.symbol}>
                    {p.symbol} — Available: {p.quantity} shares
                  </option>
                ))}
              </select>
            </div>

            {selectedStock && (
              <>
                <div className="stock-info">
                  <div className="info-row">
                    <span>Stock Symbol:</span>
                    <strong>{selectedStock.symbol}</strong>
                  </div>
                  <div className="info-row">
                    <span>Current Price:</span>
                    <strong>
                      {selectedPrice > 0
                        ? formatCurrency(selectedPrice)
                        : "Loading..."}
                    </strong>
                  </div>
                  <div className="info-row">
                    <span>Available Qty:</span>
                    <strong>{selectedStock.quantity} shares</strong>
                  </div>
                </div>

                <div className="form-group">
                  <label>Quantity to Sell</label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    max={maxQty}
                    className="form-input"
                  />
                  <small className="qty-hint">Max: {maxQty} shares</small>
                </div>

                {quantity && selectedPrice > 0 && (
                  <div className="sell-summary">
                    <div className="summary-row">
                      <span>Shares:</span>
                      <span>
                        {quantity} × {formatCurrency(selectedPrice)}
                      </span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Amount:</span>
                      <span>
                        {formatCurrency(Number(quantity) * selectedPrice)}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={handleSell}
              className="sell-btn"
              disabled={!symbol || !quantity || selectedPrice === 0}
            >
              📉 SELL STOCK
            </button>

            {message && <p className="success-message">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
}
