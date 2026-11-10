// Quick test for the Booking API
// Run with the server ON:  node scripts/testBookings.js

const BASE_URL = "http://localhost:9000/api";

const send = async (label, method, url, body) => {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  const data = await res.json();
  console.log(`\n${label} -> ${res.status}`);
  console.log(data.message);
  return data;
};

const run = async () => {
  // Use the first room in the database
  const rooms = await send("GET rooms", "GET", `${BASE_URL}/rooms`);
  if (!rooms.data || rooms.data.length === 0) {
    console.log("No rooms found. Run scripts/testRooms.js first.");
    return;
  }
  const room = rooms.data[0];
  console.log("using room:", room.name);

  const booking = {
    roomId: room._id,
    studentName: "Dayun Yu",
    studentEmail: "dayun@example.com",
    startTime: "2026-11-20T10:00",
    endTime: "2026-11-20T11:00",
  };

  // 1. Create (this one stays in the database)
  const created = await send("POST create booking", "POST", `${BASE_URL}/bookings`, booking);
  const id = created.data?._id;

  // 2. Same room + overlapping time -> should be blocked
  await send("POST overlapping booking (expect 409)", "POST", `${BASE_URL}/bookings`, {
    ...booking,
    studentName: "Someone Else",
    startTime: "2026-11-20T10:30",
    endTime: "2026-11-20T11:30",
  });

  // 3. Read
  const all = await send("GET all bookings", "GET", `${BASE_URL}/bookings`);
  console.log("count:", all.count, "| first booking room:", all.data?.[0]?.roomId?.name);
  await send("GET one booking", "GET", `${BASE_URL}/bookings/${id}`);
  const mine = await send("GET my bookings", "GET", `${BASE_URL}/bookings?studentEmail=dayun@example.com`);
  console.log("my bookings:", mine.count);

  // 4. Update to a later time
  const updated = await send("PUT move to 1pm", "PUT", `${BASE_URL}/bookings/${id}`, {
    ...booking,
    startTime: "2026-11-20T13:00",
    endTime: "2026-11-20T14:00",
  });
  console.log("new startTime:", updated.data?.startTime);

  // 5. Error cases
  await send("GET invalid id (expect 400)", "GET", `${BASE_URL}/bookings/123`);
  await send("POST end before start (expect 400)", "POST", `${BASE_URL}/bookings`, {
    ...booking,
    startTime: "2026-11-21T12:00",
    endTime: "2026-11-21T11:00",
  });
  await send("POST missing fields (expect 400)", "POST", `${BASE_URL}/bookings`, { roomId: room._id });

  // 6. Delete a temp booking, then check it is gone
  const temp = await send("POST temp booking", "POST", `${BASE_URL}/bookings`, {
    ...booking,
    startTime: "2026-11-22T09:00",
    endTime: "2026-11-22T10:00",
  });
  await send("DELETE temp booking", "DELETE", `${BASE_URL}/bookings/${temp.data?._id}`);
  await send("GET deleted booking (expect 404)", "GET", `${BASE_URL}/bookings/${temp.data?._id}`);
};

run().catch((err) => console.error("Test failed:", err.message));