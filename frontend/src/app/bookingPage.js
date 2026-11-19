"use client";
import {useState} from "react";

export default function bookingPage(){

    // const [message, setMessage] = useState("");

    const fetchBooks = async () => {
        console.log("Fetching Booking api from backend");

        try{
            const response = await backendBookingCall("/create",{
                responseType: "blob" }); 

                if(response?.type ==="error"){

                }
        } catch(err){

        }
    }
    return(
        <div>
            
        </div>
    )
}