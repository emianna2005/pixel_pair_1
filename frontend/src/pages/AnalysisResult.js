import React, { useState } from "react";
import "./AnalysisResult.css";

function AnalysisResult({ result }) {
  // Example: result = { classification: "concerning", explanation: "Some text here" }
  const [classification] = useState(result?.classification || "concerning");
  const [explanation] = useState(
    result?.explanation ||
      "Based on the details you shared, this situation may indicate a repeated pattern of dismissive behavior."
  );

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