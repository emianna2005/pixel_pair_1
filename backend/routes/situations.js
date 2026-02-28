// routes/situations.js
import express from "express";
import Situation from "../models/Situation.js";

const router = express.Router();

router.get("/user/:userId", async (req, res) => {
  try {
    const situations = await Situation.find({ userId: req.params.userId });
    res.status(200).json({ data: situations });
  } catch (error) {
    console.error("Get user situations error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/situations
router.post("/", async (req, res) => {
  try {
    const {
      description,
      category,
      repeatedBehavior,
      powerImbalance,
      feltConfusedOrDismissed
    } = req.body;

    // Basic validation
    if (!description || !category) {
      return res.status(400).json({ error: "Description and category are required." });
    }

    const newSituation = new Situation({
      description,
      category,
      repeatedBehavior: repeatedBehavior || false,
      powerImbalance: powerImbalance || false,
      feltConfusedOrDismissed: feltConfusedOrDismissed || false
    });

    const savedSituation = await newSituation.save();

    res.status(201).json({
      message: "Situation submitted successfully!",
      data: savedSituation
    });
  } catch (error) {
    console.error("Situation error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;