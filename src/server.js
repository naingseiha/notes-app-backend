import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRouter from "./routes/notes.route.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Middleware to parse JSON requests
app.use(
  cors({
    orign: "http://localhost:5173", // Adjust this to your frontend URL
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
