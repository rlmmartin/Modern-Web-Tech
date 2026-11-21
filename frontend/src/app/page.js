"use client";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/createRoom";
import EditRoom from "./pages/EditRoom";

import Bookings from "./pages/Booking";
import CreateBooking from "./pages/createBooking";
import EditBooking from "./pages/EditBooking";

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Rooms />} />

        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/create" element={<CreateRoom />} />
        <Route path="/rooms/edit/:id" element={<EditRoom />} />

        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/create" element={<CreateBooking />} />
        <Route path="/bookings/edit/:id" element={<EditBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;