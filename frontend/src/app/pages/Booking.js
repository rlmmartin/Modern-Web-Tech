import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookings, deleteBooking } from "../APIs/bookingApi.js";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
  try {
    const response = await getBookings();
    setBookings(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
  getBookings()
    .then((response) => {
      setBookings(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
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
    <div className="page-container">
      <h1>Bookings</h1>

      <Link className="add-link" to="/bookings/create">
        Add Booking
      </Link>

      {bookings.map((booking) => (
        <div className="booking-card"
          key={booking._id}>
          <h3>{booking.studentName}</h3>

          <p>Room: {booking.roomId?.name}</p>

          <p>Email: {booking.studentEmail}</p>
        <div className="actions">
         <Link to={`/bookings/edit/${booking._id}`}>
            Edit
          </Link> 
        </div>

        
          

          <button onClick={() => handleDelete(booking._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bookings;