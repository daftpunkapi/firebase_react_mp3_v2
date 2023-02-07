// import '../App.css';
// import React, { useContext, useEffect } from 'react';
// import { SocketContext } from "../context/RoomContext";
// import { UserAuth } from "../context/AuthContext";


// const Room2 = () => {
//   const {user} = UserAuth();
//   const socket = useContext(SocketContext);

//   useEffect(() => {
//     socket.emit("firebaseUser",{userId : user.uid, socketId: socket.id, name: user.displayName, avatar: user.photoURL, email: user.email, room:"room2"});
//   }, [socket]);

//   return (
//     <div className='App'>
//       <h1>
//         Room2
//       </h1>
//     </div>
//   );
// };

// export default Room2;