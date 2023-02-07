import React, { useEffect, useState } from 'react';
import '../App.css';
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");


const Room1 = () => {
  const {user} = UserAuth();
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const joinRoomSocket = () =>{
    // socket.emit("join_room", "room1");
    socket.emit("firebaseUser",{userId : user.uid, socketId: socket.id, name: user.displayName, room:"room1"}, );
  }

  useEffect(() => {
    if (!user) {
    navigate("/");
    };
  
    socket.on("allUsers", (data) => {
      setAllUsers(data);
    });
    
  }, [user, navigate]);

  return (
    <div className='App'>
      <h1>
        Room 1
      </h1>
      <button onClick={joinRoomSocket}>Go Live!</button>

      {allUsers.map(data => {
        // if(data.socketId !== socket.id){
          return(
            <div> {data.name}</div>
          );
        // }
      })}

    </div>
  );
};

export default Room1;




