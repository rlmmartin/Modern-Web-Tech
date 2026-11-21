import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../APIs/roomApi.js";

function CreateRoom() {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    name: "",
    location: "",
    capacity: "",
    features: "",
  });

  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      ...room,
      capacity: Number(room.capacity),
      features: room.features
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    };

try {
  await createRoom(roomData);
  alert("Room created successfully");
  navigate("/rooms");
} catch (error) {
  alert(error.response?.data?.message || "Failed to create room");
}
  };

  return (
    <div className="page-container">
      <h1>Create Room</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={room.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={room.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={room.capacity}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="features"
          placeholder="Whiteboard, TV"
          value={room.features}
          onChange={handleChange}
        />

        <button type="submit">
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;