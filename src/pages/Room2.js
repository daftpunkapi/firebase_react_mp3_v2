import '../App.css';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../context/RoomContext";
// import { UserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const cursorUrlArray = [
  'https://icons.iconarchive.com/icons/svengraph/daft-punk/256/Daft-Punk-Guyman-Off-icon.png', 
  'https://icons.iconarchive.com/icons/everaldo/starwars/128/Darth-Vader-icon.png', 
  'https://icons.iconarchive.com/icons/everaldo/starwars/128/clone-old-icon.png',
  'https://icons.iconarchive.com/icons/svengraph/daft-punk/256/Daft-Punk-Thomas-On-icon.png'
];

const Room2 = () => {
    const [allRoomUsers, setRoomUsers] = useState([]);
    const socket = useContext(SocketContext);
    const[otherCursors, setOtherCursors] = useState([]);
    const [cursorUrl, setCursorUrl] = useState("");
    // const {user} = UserAuth();
    // const navigate = useNavigate();

    useEffect(() => {
        
        socket.on("allRoomUsers", (data) => {
            let roomdata = data
            .filter(obj => obj.room === "room2");
            setRoomUsers(roomdata);
        });
        
        function handleMouseMove(event){
          socket.emit("mouseMove", {socketId : socket.id, x: event.clientX, y: event.clientY});
        }
    
        // Add event listener for mouse movement {part of DOM element}
        document.addEventListener("mousemove", handleMouseMove);

        // Event listener on hitting browser Back button
        window.onpopstate = (e) => {
          socket.emit("backrefresh");
        };

        // Event listener on hitting browser Refresh button
        // window.onbeforeunload = (e) => {
        //   socket.emit("backrefresh");
        // };
    
        // Handle broadcasted mouseMoved event from server
        socket.on("cursorUpdate", (data) => {
          let roomCursors = data
          .filter (obj => obj.room === "room2");
          setOtherCursors(roomCursors);
        });

        setCursorUrl(cursorUrlArray[Math.floor(Math.random() * cursorUrlArray.length)]);

    }, [socket]);

    return (
        <div className='App'>
        
        <h1>
            Room2
        </h1>
        
        {allRoomUsers.map(data => {
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
        
        {otherCursors.map((cursor, index) => {
            if (cursor.socketId !== socket.id) {
              return (
                <div 
                  key={cursor.socketId || index} 
                  className="other-cursor" 
                  style={{
                    left: cursor.x,
                    top: cursor.y,
                    backgroundImage: `url(${cursorUrl})`
                  }}
                />
              );
            } else {
              return null;
            }
        })}

        </div>
    );
 };

export default Room2;

