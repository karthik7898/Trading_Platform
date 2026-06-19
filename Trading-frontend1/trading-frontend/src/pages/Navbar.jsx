import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";


export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>TradeX</h2>

      <div style={styles.links}>
        <Link to="/home">Home</Link>
        <Link to="/stocks">Stocks</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/transactions">History</Link>
      </div>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#0f172a",
    color: "white",
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "20px" },
  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
};
