// "use client";
// // import { backendRoomCall } from "./api"\
// import { backendCall } from "../APIs/roomApi";
// import {useState} from 'react';

// export default function roomPage(){
//     // const [messase, setMessage] = useState("");
//     const fetchRooms = async () => {
//         console.log("Fetching rooms for backend . . .");

//         // const [message, setmessage] = useState("");

//         try{
//             const response = await backendCall("/rooms");
//             console.log("Room response:", response);

//             if(response?.type === "error"){
//                 return response.status(404).json({
//                     message: response.message,
//                     type: error,
//                 })
                
//             }

//         }catch(err){

//         }
//     }
//     return(
//         <div>


//             {/* <button
//             onClick={Room.createRoom}
//             title="Create Room"
//             type="button"></button>

//             <button 
//             type="button" 
//             title="delete"
//             onClick={Room.deleteRoom}></button> */}
//         </div>
//     )
// }