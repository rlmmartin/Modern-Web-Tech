import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

// Helper - check the times and the room before saving a booking
// Returns an error object { status, message } or null if everything is ok
const checkBooking = async ({ roomId, startTime, endTime }, bookingId = null) => {
  if (!mongoose.isValidObjectId(roomId)) {
    return { status: 400, message: "Invalid room ID" };
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { status: 400, message: "startTime and endTime must be valid dates" };
  }

  if (start >= end) {
    return { status: 400, message: "endTime must be after startTime" };
  }

  // The room has to exist
  const room = await Room.findById(roomId);
  if (!room) {
    return { status: 404, message: "Room not found" };
  }

  // No double booking: same room, times overlap, still confirmed
  const overlap = await Booking.findOne({
    _id: { $ne: bookingId }, // skip this booking when updating
    roomId,
    status: "confirmed",
    startTime: { $lt: end },
    endTime: { $gt: start },
  });

  if (overlap) {
    return { status: 409, message: "This room is already booked for that time" };
  }

  return null;
};

// GET all bookings
// Optional filters: /api/bookings?roomId=...  or  ?studentEmail=...
export const getBookings = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.roomId) {
      if (!mongoose.isValidObjectId(req.query.roomId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid room ID",
        });
      }
      filter.roomId = req.query.roomId;
    }

    if (req.query.studentEmail) {
      filter.studentEmail = req.query.studentEmail.toLowerCase();
    }

    // populate -> replace roomId with the room's name and location
    const bookings = await Booking.find(filter)
      .populate("roomId", "name location")
      .sort({ startTime: 1 });

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

// GET one booking by ID
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id).populate("roomId", "name location");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// POST create a new booking
export const createBooking = async (req, res, next) => {
  try {
    const { roomId, studentName, studentEmail, startTime, endTime } = req.body;

    if (!roomId || !studentName || !studentEmail || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "roomId, studentName, studentEmail, startTime, and endTime are required",
      });
    }

    const problem = await checkBooking({ roomId, startTime, endTime });
    if (problem) {
      return res.status(problem.status).json({
        success: false,
        message: problem.message,
      });
    }

    const booking = new Booking({
      roomId,
      studentName,
      studentEmail,
      startTime,
      endTime,
      status: req.body.status || "confirmed",
    });
    const savedBooking = await booking.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

// PUT update a booking
export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const { roomId, studentName, studentEmail, startTime, endTime, status } = req.body;

    if (!roomId || !studentName || !studentEmail || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "roomId, studentName, studentEmail, startTime, and endTime are required",
      });
    }

    const existing = await Booking.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only check times when the booking will still be confirmed
    if ((status || "confirmed") === "confirmed") {
      const problem = await checkBooking({ roomId, startTime, endTime }, id);
      if (problem) {
        return res.status(problem.status).json({
          success: false,
          message: problem.message,
        });
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { roomId, studentName, studentEmail, startTime, endTime, status: status || "confirmed" },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

// DELETE a booking
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (err) {
    next(err);
  }
};