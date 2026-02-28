import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SubmitSituation from "./pages/SubmitSituation";
import GroupDiscussion from "./pages/GroupDiscussion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitSituation />} />
        <Route path="/discussion" element={<GroupDiscussion />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrappers to handle switching between login and signup
function LoginWrapper() {
  const [showSignup, setShowSignup] = React.useState(false);
  return showSignup ? (
    <Signup switchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login switchToSignup={() => setShowSignup(true)} />
  );
}

function SignupWrapper() {
  const [showLogin, setShowLogin] = React.useState(false);
  return showLogin ? (
    <Login switchToSignup={() => setShowLogin(false)} />
  ) : (
    <Signup switchToLogin={() => setShowLogin(true)} />
  );
}

export default App;