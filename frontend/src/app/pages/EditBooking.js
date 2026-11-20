import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, updateBooking } from "../APIs/bookingApi.js";
import { getRooms } from "../APIs/roomApi.js";

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  const [booking, setBooking] = useState({
    roomId: "",
    studentName: "",
    studentEmail: "",
    startTime: "",
    endTime: "",
    status: "confirmed",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await getBookingById(id);
        const roomRes = await getRooms();

        const data = bookingRes.data.data;

        setBooking({
          roomId: data.roomId?._id || data.roomId,
          studentName: data.studentName,
          studentEmail: data.studentEmail,
          startTime: data.startTime.slice(0, 16),
          endTime: data.endTime.slice(0, 16),
          status: data.status,
        });

        setRooms(roomRes.data.data);
      } catch (error) {
        console.error("Error loading booking:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBooking(id, booking);

      alert("Booking updated successfully");

      navigate("/bookings");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking");
    }
  };

  return (
    <div className="page-container">
      <h1>Edit Booking</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={booking.studentName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="studentEmail"
          placeholder="Student Email"
          value={booking.studentEmail}
          onChange={handleChange}
          required
        />

        <select
          name="roomId"
          value={booking.roomId}
          onChange={handleChange}
          required
        >
          <option value="">Select Room</option>

          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="startTime"
          value={booking.startTime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="endTime"
          value={booking.endTime}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={booking.status}
          onChange={handleChange}
        >
          <option value="confirmed">
            Confirmed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

        <button type="submit">
          Update Booking
        </button>
      </form>
    </div>
  );
}

export default EditBooking;
