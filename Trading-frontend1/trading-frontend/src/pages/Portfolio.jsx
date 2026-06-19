import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/portfolio.css";
export default function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/trading/portfolio/${userId}`)
      .then((res) => setStocks(res.data))
      .catch(() => alert("Failed to load portfolio"))
      .finally(() => setLoading(false));
  }, [userId]);

  const formatCurrency = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? `₹${n.toFixed(2)}` : "—";
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading portfolio...</p>;
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1>📋 Your Portfolio</h1>
        <p>Manage your stock holdings</p>
      </div>

      {stocks.length === 0 ? (
        <div className="empty-state">
          <p>📑 No stocks owned yet</p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Start buying stocks to build your portfolio</p>
        </div>
      ) : (
        <div>
          <div className="portfolio-summary">
            <div className="summary-item">
              <div className="summary-label">Total Holdings</div>
              <div className="summary-value">{stocks.length}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total Quantity</div>
              <div className="summary-value">{stocks.reduce((s, a) => s + a.quantity, 0)}</div>
            </div>
          </div>

          <table className="holdings-table">
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Quantity</th>
                <th>Average Price</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: "bold", color: "#1a1a2e" }}>{s.symbol}</td>
                  <td>{s.quantity}</td>
                  <td>{formatCurrency(s.avgPrice)}</td>
                  <td style={{ color: "#27ae60", fontWeight: "bold" }}>
                    {formatCurrency((s.avgPrice || 0) * s.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
