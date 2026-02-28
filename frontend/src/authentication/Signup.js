import { useState } from "react";
import axios from "axios";

export default function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password
      });
      alert("Account created. Please login.");
      switchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* LOGO */}
        <h1 style={styles.logo}>CLARITY</h1>
        <p style={styles.tagline}>Reflect. Understand. Decide.</p>

        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Username (pseudonymous)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={styles.switch}>
          Already have an account?{" "}
          <span style={styles.link} onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #fdf2f8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "380px",
    padding: "35px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#4f46e5",
    marginBottom: "4px"
  },
  tagline: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "25px"
  },
  title: {
    marginBottom: "15px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "11px 12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "18px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px"
  },
  error: {
    color: "#e11d48",
    fontSize: "13px",
    marginTop: "8px"
  },
  switch: {
    marginTop: "18px",
    fontSize: "14px"
  },
  link: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500"
  }
};