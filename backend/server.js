// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";                      // ✅ ES module import
import authRoutes from "./routes/auth.js";
import situationRoutes from "./routes/situations.js";

dotenv.config();                              // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/situations", situationRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err.message));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});