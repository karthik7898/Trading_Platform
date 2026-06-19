import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/transactions.css";

export default function Transactions() {
  const userId = localStorage.getItem("userId");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    API.get(`/trading/transactions/${userId}`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch(() => {
        alert("Failed to load transactions");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const formatCurrency = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? `₹${n.toFixed(2)}` : "—";
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading transactions...</p>;
  }

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>📈 Transactions</h1>
        <p>View your trading history</p>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>📑 No transactions found</p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Your trades will appear here</p>
        </div>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>#{t.id}</td>
                <td style={{ fontWeight: "bold", color: "#1a1a2e" }}>{t.symbol}</td>
                <td>{t.quantity}</td>
                <td>{formatCurrency(t.price)}</td>
                <td style={{ color: "#2c3e50", fontWeight: "500" }}>{formatCurrency(t.totalAmount)}</td>
                <td className={`transaction-type ${t.type === "BUY" ? "buy" : "sell"}`}>
                  {t.type === "BUY" ? "📈" : "📉"} {t.type}
                </td>
                <td style={{ fontSize: "0.9rem", color: "#666" }}>
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
