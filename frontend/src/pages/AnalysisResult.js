import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnalysisResult.css";

function AnalysisResult({ result }) {
  const navigate = useNavigate();

  // Example: result = { classification: "concerning", explanation: "Some text here" }
  const [classification, setClassification] = useState(
    result?.classification || "concerning"
  );
  const [explanation, setExplanation] = useState(
    result?.explanation ||
      "Based on the details you shared, this situation may indicate a repeated pattern of dismissive behavior."
  );

  const handleShare = () => {
    alert("Shared to group discussion!");
    navigate("/discussion");
  };

  const handleKeepPrivate = () => {
    alert("Kept private!");
    navigate("/");
  };

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Analysis Result</h1>

      <div className={`classification ${classification}`}>
        {classification === "concerning"
          ? "Concerning Pattern"
          : classification === "clarification"
          ? "Needs Clarification"
          : "Healthy Interaction"}
      </div>

      <div className="analysis-explanation">
        <p>{explanation}</p>
      </div>

      <div className="disclaimer">
        ⚠ This analysis is AI-generated and should not replace professional advice.
      </div>

      <div className="analysis-buttons">
        <button className="share-btn" onClick={handleShare}>
          Share to Discussion
        </button>
        <button className="private-btn" onClick={handleKeepPrivate}>
          Keep Private
        </button>
      </div>
    </div>
  );
}

export default AnalysisResult;