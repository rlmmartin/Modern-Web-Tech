import bookingRoutes from "./routes/bookingRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HumberRooms API is running",
  });
});

// Room routes
app.use("/api/rooms", roomRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

// 404 middleware
app.use(notFound);

// Error-handling middleware
app.use(errorHandler);

// Connect to MongoDB first, then start the server
const startServer = async () => {
  try {
    if (!DATABASE_URL) {
      console.error("DATABASE_URL is missing in the .env file");
      process.exit(1);
    }

    await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log("Press Ctrl+C to stop");
    });
  } catch (err) {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();