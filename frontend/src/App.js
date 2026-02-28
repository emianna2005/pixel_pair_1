import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SubmitSituation from "./pages/SubmitSituation";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import AnalysisResult from "./pages/AnalysisResult";

function App() {

  // ✅ Reactive authentication state
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
  );

  // ✅ Listen for token changes (login/logout updates UI)
  React.useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isAuthenticated = token && token !== "undefined";

  return (
    <Router>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/submit"
          element={
            isAuthenticated ? <SubmitSituation /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/analysis"
          element={
            isAuthenticated ? <AnalysisResult /> : <Navigate to="/login" />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />

      </Routes>
    </Router>
  );
}

/* =========================
   LOGIN WRAPPER
========================= */
function LoginWrapper() {
  const [showSignup, setShowSignup] = React.useState(false);

  return showSignup ? (
    <Signup switchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login switchToSignup={() => setShowSignup(true)} />
  );
}

/* =========================
   SIGNUP WRAPPER
========================= */
function SignupWrapper() {
  const [showLogin, setShowLogin] = React.useState(false);

  return showLogin ? (
    <Login switchToSignup={() => setShowLogin(false)} />
  ) : (
    <Signup switchToLogin={() => setShowLogin(true)} />
  );
}

export default App;