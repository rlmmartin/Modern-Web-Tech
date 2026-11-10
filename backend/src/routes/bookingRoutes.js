import express from "express";

import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// GET all bookings
router.get("/", getBookings);

// GET one booking by ID
router.get("/:id", getBookingById);

// POST create a booking
router.post("/", createBooking);

// PUT update a booking
router.put("/:id", updateBooking);

// DELETE a booking
router.delete("/:id", deleteBooking);

export default router;