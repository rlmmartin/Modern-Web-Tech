// Placeholder controller for getting all rooms
export const getRooms = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Room routes are working. Room data will be added in Task 2.",
      data: [],
    });
  } catch (err) {
    next(err);
  }
};