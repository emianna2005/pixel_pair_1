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

    // ✅ Validation
    if (!description || !category) {
      return res.status(400).json({
        error: "Description and category are required."
      });
    }

    const text = description.toLowerCase();

    /* ======================================
       SCORING SYSTEM
    ====================================== */
    let score = 0;

    // ✅ Boolean scoring (safe truthy check)
    if (repeated) score += 2;
    if (powerImbalance) score += 2;
    if (confused) score += 1;

    // ✅ Improved keyword detection using regex
    const concerningKeywords = [
      "insult",
      "control",
      "manipulate",
      "yell",
      "threat",
      "humiliate",
      "gaslight",
      "ignore"
    ];

    concerningKeywords.forEach((word) => {
      const regex = new RegExp(word, "i");
      if (regex.test(text)) {
        score += 2;
      }
    });
    console.log("Text:", text);
console.log("Score:", score);
console.log("Repeated:", repeated);
console.log("PowerImbalance:", powerImbalance);
console.log("Confused:", confused);

    /* ======================================
       CLASSIFICATION LOGIC
    ====================================== */
    let classification = "healthy";
    let explanation = "Based on the information provided, this appears healthy.";


    if (score >= 4) {
      classification = "concerning";
      explanation =
        "There are multiple indicators of unhealthy or harmful interaction patterns.";
    } 
    else if (score >= 2) {
      classification = "clarification";
      explanation =
        "Some aspects may require further clarification or discussion.";
    }
    console.log("Final Classification:", classification);

    /* ======================================
       SAVE TO DATABASE
    ====================================== */
    const newSituation = new Situation({
      description,
      category,
      repeatedBehavior: !!repeated,
      powerImbalance: !!powerImbalance,
      feltConfusedOrDismissed: !!confused,
      classification,
      explanation
    });

    const savedSituation = await newSituation.save();

    /* ======================================
       RESPONSE
    ====================================== */
    return res.status(201).json({
      success: true,
      score,
      classification,
      explanation,
      data: savedSituation
    });

  } catch (error) {
    console.error("❌ Situation Error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
});

export default router;