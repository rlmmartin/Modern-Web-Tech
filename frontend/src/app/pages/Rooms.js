import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms, deleteRoom } from "../APIs/roomApi.js";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const loadRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      await loadRooms();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="page-container">
      <h1>Rooms</h1>

      <Link className="add-link" 
      to="/rooms/create">
        Add Room
      </Link>

      {rooms.map((room) => (
        <div className="room-card" key={room._id}>
          <h3>{room.name}</h3>
          <p>{room.location}</p>
          <p>{room.capacity}</p>

          <div className="actions">
            <Link to={`/rooms/edit/${room._id}`}>
            Edit
          </Link>

          <button onClick={() => handleDelete(room._id)}>
            Delete
          </button>
          </div>
          

        </div>
      ))}
    </div>
  );
}

export default Rooms;