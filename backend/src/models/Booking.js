import mongoose from "mongoose";

// Booking schema - one booking is for one room
const bookingSchema = new mongoose.Schema(
  {
    // Which room is booked (links to the Room collection)
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "roomId is required"],
    },

    // Who booked it
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },

    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    // When the booking starts and ends
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },

    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },

    // A booking is either confirmed or cancelled
    status: {
      type: String,
      enum: {
        values: ["confirmed", "cancelled"],
        message: "Status must be confirmed or cancelled",
      },
      default: "confirmed",
    },
  },
  // Adds createdAt and updatedAt automatically
  { timestamps: true }
);

// Model name "Booking" -> collection "bookings" in MongoDB
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;