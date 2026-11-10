import express from "express";

import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

// GET all rooms
router.get("/", getRooms);

// GET one room by ID
router.get("/:id", getRoomById);

// POST create a room
router.post("/", createRoom);

// PUT update a room
router.put("/:id", updateRoom);

// DELETE a room
router.delete("/:id", deleteRoom);

export default router;