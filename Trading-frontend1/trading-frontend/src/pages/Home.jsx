export default function Home() {
  const username = localStorage.getItem("username");
  const balance = localStorage.getItem("balance");

  return (
    <div style={{ padding: "24px" }}>
      <h1>Welcome, {username} 👋</h1>

      <div style={card}>
        <h3>Available Balance</h3>
        <h2>₹{Number(balance).toFixed(2)}</h2>
      </div>
    </div>
  );
}

const card = {
  marginTop: "20px",
  padding: "20px",
  background: "#f1f5f9",
  borderRadius: "8px",
  width: "300px",
};
