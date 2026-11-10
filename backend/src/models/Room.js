import mongoose from "mongoose";

// Room schema - describes what a study room looks like in the database
const roomSchema = new mongoose.Schema(
  {
    // Room name (e.g. "Study Room A")
    name: {
      type: String,
      required: [true, "Room name is required"],
      trim: true,
    },

    // Where the room is (e.g. "North Campus, LRC 2nd floor")
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    // How many people can use the room
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    // Extra features like "Whiteboard" or "TV"
    features: {
      type: [String],
      default: [],
    },
  },
  // Adds createdAt and updatedAt automatically
  { timestamps: true }
);

// Model name "Room" -> collection "rooms" in MongoDB
const Room = mongoose.model("Room", roomSchema);

export default Room;