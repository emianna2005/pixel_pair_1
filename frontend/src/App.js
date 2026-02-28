import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SubmitSituation from "./pages/SubmitSituation";
import GroupDiscussion from "./pages/GroupDiscussion";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import AnalysisResult from "./pages/AnalysisResult"; // ✅ Already imported

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        {/* Default route */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Protected routes */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/submit" 
          element={isAuthenticated ? <SubmitSituation /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/discussion" 
          element={isAuthenticated ? <GroupDiscussion /> : <Navigate to="/login" />} 
        />

        {/* ✅ THIS WAS MISSING */}
        <Route 
          path="/analysis" 
          element={isAuthenticated ? <AnalysisResult /> : <Navigate to="/login" />} 
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />

      </Routes>
    </Router>
  );
}

// LoginWrapper allows switching to Signup
function LoginWrapper() {
  const [showSignup, setShowSignup] = React.useState(false);
  return showSignup ? (
    <Signup switchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login switchToSignup={() => setShowSignup(true)} />
  );
}

// SignupWrapper allows switching to Login
function SignupWrapper() {
  const [showLogin, setShowLogin] = React.useState(false);
  return showLogin ? (
    <Login switchToSignup={() => setShowLogin(false)} />
  ) : (
    <Signup switchToLogin={() => setShowLogin(true)} />
  );
}

export default App;