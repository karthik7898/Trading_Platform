import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/users/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>📈 Trading Hub</h1>
          <p>Create your trading account</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="auth-form">
          <div className="form-group">
            <label>👤 Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a unique username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🔐 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            🚀 Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <a href="#/login" onClick={() => navigate("/login")}>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}
