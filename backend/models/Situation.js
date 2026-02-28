import mongoose from "mongoose";

const situationSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Friendship", "Academic", "Workplace", "Other"], 
    required: true 
  },
  repeatedBehavior: { type: Boolean, default: false },
  powerImbalance: { type: Boolean, default: false },
  feltConfusedOrDismissed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Situation = mongoose.model("Situation", situationSchema);
export default Situation;