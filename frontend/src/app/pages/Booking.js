import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookings, deleteBooking } from "../APIs/bookingApi";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBookings();
}, []);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      loadBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h1>Bookings</h1>

      <Link to="/bookings/create">
        Add Booking
      </Link>

      {bookings.map((booking) => (
        <div key={booking._id}>
          <h3>{booking.studentName}</h3>

          <p>Room: {booking.roomId?.name}</p>

          <p>Email: {booking.studentEmail}</p>

          <Link to={`/bookings/edit/${booking._id}`}>
            Edit
          </Link>

          <button onClick={() => handleDelete(booking._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bookings;