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
    socket.emit("firebaseUser",{userId : user.uid, socketId: socket.id, name: user.displayName, avatar: user.photoURL, email: user.email, room:"room1"});
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: '10px 0' }}> 
               <p style={{ margin: '0 10px' }}>{data.email}</p>
               <img 
                src={data.avatar} 
                alt="User Avatar" 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '25px',
                  objectFit: 'cover'
                }}
                />
            </div>
          );
      })}

    </div>
  );
};

export default Room1;

// import '../App.css';
// import React, { useContext, useEffect } from 'react';
// import { SocketContext } from "../context/RoomContext";
// import { UserAuth } from "../context/AuthContext";


// const Room1 = () => {
//   const {user} = UserAuth();
//   const socket = useContext(SocketContext);

//   useEffect(() => {
//     socket.emit("firebaseUser",{userId : user.uid, socketId: socket.id, name: user.displayName, avatar: user.photoURL, email: user.email, room:"room1"});
//   }, [socket]);

//   return (
//     <div className='App'>
//       <h1>
//         Room1
//       </h1>
//     </div>
//   );
// };

// export default Room1;


