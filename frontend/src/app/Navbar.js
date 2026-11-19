import { Link } from "react-dom";


function Navbar() {
  return (
    <nav>
      <Link to="/rooms">Rooms</Link>

      <Link to="/rooms/create">
        Add Room
      </Link>

      <Link to="/bookings">
        Bookings
      </Link>

      <Link to="/bookings/create">
        Add Booking
      </Link>
    </nav>
  );
}

export default Navbar;