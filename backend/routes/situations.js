import express from "express";
import Situation from "../models/Situation.js";

const router = express.Router();

/* ======================================
   CREATE & ANALYZE SITUATION
====================================== */
router.post("/", async (req, res) => {
  try {
    const {
      description,
      category,
      repeated,
      powerImbalance,
      confused
    } = req.body;

    if (!description || !category) {
      return res.status(400).json({
        error: "Description and category are required."
      });
    }

    const text = description.toLowerCase();

    let classification = "healthy";
    let explanation = "This appears to be a healthy interaction.";
    let score = 0;

    if (repeated === true) score += 2;
    if (powerImbalance === true) score += 2;
    if (confused === true) score += 1;

    const concerningKeywords = [
      "insult",
      "control",
      "manipulate",
      "yell",
      "threat",
      "humiliate",
      "gaslight",
      "ignore repeatedly"
    ];

    concerningKeywords.forEach(word => {
      if (text.includes(word)) {
        score += 2;
      }
    });

    if (score >= 4) {
      classification = "concerning";
      explanation =
        "There are multiple indicators of unhealthy or harmful patterns.";
    } 
    else if (score >= 2) {
      classification = "clarification";
      explanation =
        "Some aspects may require further clarification.";
    } 
    else {
      classification = "healthy";
      explanation =
        "Based on the information provided, this appears healthy.";
    }

    const newSituation = new Situation({
      description,
      category,
      repeatedBehavior: repeated || false,
      powerImbalance: powerImbalance || false,
      feltConfusedOrDismissed: confused || false,
      classification,
      explanation
    });

    const savedSituation = await newSituation.save();

    res.status(201).json({
      classification,
      explanation,
      score,
      data: savedSituation
    });

  } catch (error) {
    console.error("Situation error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;