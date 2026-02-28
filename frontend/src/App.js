
import { useState } from "react";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";

function App() {
  const [page, setPage] = useState("login");
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  if (!authenticated) {
    return page === "login" ? (
      <Login
        onLoginSuccess={() => setAuthenticated(true)}
        switchToSignup={() => setPage("signup")}
      />
    ) : (
      <Signup switchToLogin={() => setPage("login")} />
    );
  }

  return <h1>Welcome to Clarity</h1>;
}

export default App;