import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getBookings = () =>
  axios.get(`${API}/bookings`);

export const getBookingById = (id) =>
  axios.get(`${API}/bookings/${id}`);

export const createBooking = (data) =>
  axios.post(`${API}/bookings`, data);

export const updateBooking = (id, data) =>
  axios.put(`${API}/bookings/${id}`, data);

export const deleteBooking = (id) =>
  axios.delete(`${API}/bookings/${id}`);