// Temporary booking data.
// Task 2 will replace this array with MongoDB.
let bookings = [
  {
    id: 1,
    roomId: 101,
    studentName: "Sample Student",
    studentEmail: "student@example.com",
    startTime: "2026-11-10T10:00:00",
    endTime: "2026-11-10T11:00:00",
    status: "confirmed",
  },
];

// GET all bookings
export const getBookings = async (req, res, next) => {
  try {
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
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Booking ID must be a number",
      });
    }

    const booking = bookings.find((item) => item.id === bookingId);

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
    const {
      roomId,
      studentName,
      studentEmail,
      startTime,
      endTime,
    } = req.body;

    if (
      !roomId ||
      !studentName ||
      !studentEmail ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "roomId, studentName, studentEmail, startTime, and endTime are required",
      });
    }

    const newBooking = {
      id: Date.now(),
      roomId,
      studentName,
      studentEmail,
      startTime,
      endTime,
      status: req.body.status || "confirmed",
    };

    bookings.push(newBooking);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (err) {
    next(err);
  }
};

// PUT update a booking
export const updateBooking = async (req, res, next) => {
  try {
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Booking ID must be a number",
      });
    }

    const bookingIndex = bookings.findIndex(
      (item) => item.id === bookingId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const {
      roomId,
      studentName,
      studentEmail,
      startTime,
      endTime,
      status,
    } = req.body;

    if (
      !roomId ||
      !studentName ||
      !studentEmail ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "roomId, studentName, studentEmail, startTime, and endTime are required",
      });
    }

    const updatedBooking = {
      id: bookingId,
      roomId,
      studentName,
      studentEmail,
      startTime,
      endTime,
      status: status || "confirmed",
    };

    bookings[bookingIndex] = updatedBooking;

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE a booking
export const deleteBooking = async (req, res, next) => {
  try {
    const bookingId = Number(req.params.id);

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Booking ID must be a number",
      });
    }

    const bookingIndex = bookings.findIndex(
      (item) => item.id === bookingId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const deletedBooking = bookings.splice(bookingIndex, 1)[0];

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (err) {
    next(err);
  }
};