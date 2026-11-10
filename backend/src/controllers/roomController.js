import mongoose from "mongoose";
import Room from "../models/Room.js";

// GET all rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Rooms retrieved successfully",
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

// GET one room by ID
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check the ID format before asking the database
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room retrieved successfully",
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

// POST create a new room
export const createRoom = async (req, res, next) => {
  try {
    const { name, location, capacity, features } = req.body;

    const room = new Room({ name, location, capacity, features });
    const savedRoom = await room.save();

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: savedRoom,
    });
  } catch (err) {
    // Missing or wrong fields (from the schema rules)
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

// PUT update a room
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const { name, location, capacity, features } = req.body;

    // new: true -> return the room AFTER the update
    // runValidators: true -> check the schema rules on update too
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { name, location, capacity, features },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
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

// DELETE a room
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      data: deletedRoom,
    });
  } catch (err) {
    next(err);
  }
};