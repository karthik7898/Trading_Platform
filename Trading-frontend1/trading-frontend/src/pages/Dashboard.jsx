import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/dashboard.css";
import "../styles/global.css";


export default function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    API.get(`/users/${userId}`)
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch(() => {
        alert("Failed to load user data");
      })
      .finally(() => setLoading(false));
  }, [userId, navigate]);

  const formatCurrency = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? `₹${n.toFixed(2)}` : "—";
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome back! Here's your trading overview.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">💰 Account Balance</div>
          <div className="stat-value">{formatCurrency(balance)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">👤 User ID</div>
          <div className="stat-value">#{userId}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">✅ Account Status</div>
          <div className="stat-value" style={{ color: "#27ae60" }}>Active</div>
        </div>
      </div>


    </div>
  );
}
