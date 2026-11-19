import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms, deleteRoom } from "../APIs/roomApi";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  

  useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchRooms();
}, []);

  const handleDelete = async (id) => {
    await deleteRoom(id);
    loadRooms();
  };

  return (
    <div>
      <h1>Rooms</h1>

      <Link to="/rooms/create">
        Add Room
      </Link>

      {rooms.map((room) => (
        <div key={room._id}>
          <h3>{room.name}</h3>
          <p>{room.location}</p>
          <p>{room.capacity}</p>

          <Link to={`/rooms/edit/${room._id}`}>
            Edit
          </Link>

          <button onClick={() => handleDelete(room._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rooms;