import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../APIs/roomApi.js";
import { createBooking } from "../APIs/bookingApi.js";

function CreateBooking() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  const [booking, setBooking] = useState({
    roomId: "",
    studentName: "",
    studentEmail: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getRooms();
        setRooms(res.data.data);
      } catch (error) {
        console.error("Error loading rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  await createBooking(booking);
  alert("Booking created successfully");
  navigate("/bookings");
} catch (error) {
  alert(error.response?.data?.message || "Failed to create booking");
}
  };

  return (
    <div className="page-container">
      <h1>Create Booking</h1>

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

        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

export default CreateBooking;