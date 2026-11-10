// Quick test for the Room API
// Run with the server ON:  node scripts/testRooms.js

const BASE_URL = "http://localhost:9000/api/rooms";

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
  // 1. Create 3 rooms (these stay in the database for the frontend)
  const roomA = await send("POST create room", "POST", BASE_URL, {
    name: "Study Room A",
    location: "North Campus, LRC 2nd floor",
    capacity: 4,
    features: ["Whiteboard", "TV"],
  });
  await send("POST create room", "POST", BASE_URL, {
    name: "Study Room B",
    location: "South Campus, Library 1st floor",
    capacity: 6,
    features: ["TV"],
  });
  await send("POST create room", "POST", BASE_URL, {
    name: "Quiet Room C",
    location: "North Campus, E building",
    capacity: 2,
    features: [],
  });

  const id = roomA.data._id;

  // 2. Read
  const all = await send("GET all rooms", "GET", BASE_URL);
  console.log("count:", all.count);
  await send("GET one room", "GET", `${BASE_URL}/${id}`);

  // 3. Update
  const updated = await send("PUT update capacity to 8", "PUT", `${BASE_URL}/${id}`, { capacity: 8 });
  console.log("new capacity:", updated.data?.capacity);

  // 4. Error cases
  await send("GET invalid id (expect 400)", "GET", `${BASE_URL}/abc`);
  await send("POST missing fields (expect 400)", "POST", BASE_URL, { name: "Bad Room", capacity: 0 });

  // 5. Delete a test room, then check it is gone
  const temp = await send("POST temp room", "POST", BASE_URL, {
    name: "Temp Room",
    location: "Test",
    capacity: 1,
  });
  await send("DELETE temp room", "DELETE", `${BASE_URL}/${temp.data._id}`);
  await send("GET deleted room (expect 404)", "GET", `${BASE_URL}/${temp.data._id}`);
};

run().catch((err) => console.error("Test failed:", err.message));