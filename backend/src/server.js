import bookingRoutes from "./routes/bookingRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop");
});