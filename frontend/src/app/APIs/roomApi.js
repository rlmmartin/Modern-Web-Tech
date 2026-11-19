import axios from "axios";

const API = process.env.API_URL;

export const getRooms = () =>
  axios.get(`${API}/rooms`);

export const getRoomById = (id) =>
  axios.get(`${API}/rooms/${id}`);

export const createRoom = (data) =>
  axios.post(`${API}/rooms`, data);

export const updateRoom = (id, data) =>
  axios.put(`${API}/rooms/${id}`, data);

export const deleteRoom = (id) =>
  axios.delete(`${API}/rooms/${id}`);