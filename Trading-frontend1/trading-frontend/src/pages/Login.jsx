import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/login", {
        username,
        password,
      });

      // ✅ Save user info
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("username", res.data.username);

      // ✅ Redirect after login
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>📈 Trading Hub</h1>
          <p>Sign in to your trading account</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>👤 Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>🔐 Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "🔄 Signing in..." : "✨ Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <a href="#/register" onClick={() => navigate("/register")}>
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
}
