// routes/situations.js
import express from "express";
import Situation from "../models/Situation.js";

const router = express.Router();

// GET a single situation by its MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    const situation = await Situation.findById(req.params.id);
    if (!situation) return res.status(404).json({ error: "Situation not found" });
    res.status(200).json({ data: situation });
  } catch (error) {
    console.error("Get situation by ID error:", error);
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