import React from "react";
import { useLocation } from "react-router-dom";
import "./AnalysisResult.css";

function AnalysisResult() {

  const location = useLocation();
  const result = location.state?.result;

  const classification = result?.classification || "healthy";
  const explanation =
    result?.explanation ||
    "No analysis data found.";

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
    </div>
  );
}

export default AnalysisResult;