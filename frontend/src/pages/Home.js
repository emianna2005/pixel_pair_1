import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome to Clarity</h1>
      <p className="dashboard-subtitle">
        What would you like to do today?
      </p>

      <div className="options-container">
        <div
          className="option-card"
          onClick={() => navigate("/submit")}
        >
          <h2>Submit Situation</h2>
          <p>
            Describe your personal situation anonymously and receive
            structured behavioral insights.
          </p>
        </div>

        <div
          className="option-card"
          onClick={() => navigate("/discussion")}
        >
          <h2>Group Discussion</h2>
          <p>
            Explore anonymous shared situations and contribute thoughtful
            peer perspectives.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;