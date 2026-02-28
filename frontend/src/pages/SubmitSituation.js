import React, { useState } from "react";
import "./SubmitSituation.css";

function SubmitSituation() {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    repeated: false,
    powerImbalance: false,
    confused: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Analyzing situation...");
  };

  return (
    <div className="submit-container">
      <h1 className="submit-title">Submit Your Situation</h1>
      <p className="submit-subtitle">
        Describe what happened and help us understand the context.
      </p>

      <form className="submit-form" onSubmit={handleSubmit}>
        
        {/* Situation Description */}
        <label>Situation Description</label>
        <textarea
          name="description"
          placeholder="Describe your situation in detail..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Category Dropdown */}
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Friendship">Friendship</option>
          <option value="Academic">Academic</option>
          <option value="Workplace">Workplace</option>
          <option value="Other">Other</option>
        </select>

        {/* Checkboxes */}
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="repeated"
              checked={formData.repeated}
              onChange={handleChange}
            />
            Repeated behavior?
          </label>

          <label>
            <input
              type="checkbox"
              name="powerImbalance"
              checked={formData.powerImbalance}
              onChange={handleChange}
            />
            Power imbalance?
          </label>

          <label>
            <input
              type="checkbox"
              name="confused"
              checked={formData.confused}
              onChange={handleChange}
            />
            Felt confused or dismissed?
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="analyze-btn">
          Analyze Situation
        </button>
      </form>
    </div>
  );
}

export default SubmitSituation;