import React, { useContext } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/RoomContext";

const Account = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoomSocket1 = () => {
    try {
      navigate("/accountpage/room1");
      socket.emit("firebaseUser", {
        userId: user.uid,
        socketId: socket.id,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
        room: "room1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoomSocket2 = () => {
    try {
      navigate("/accountpage/room2");
      socket.emit("firebaseUser", {
        userId: user.uid,
        socketId: socket.id,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
        room: "room2",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Account Page</h2>
      <p> Welcome, {user ? user.displayName : "Guest"}</p>
      <button onClick={handleSignOut}>Logout</button>
      <p>Please enter a room to enter into a Multiplayer Session</p>
      <button onClick={joinRoomSocket1}>Room 1</button>
      <button onClick={joinRoomSocket2}>Room 2</button>
    </div>
  );
};

export default Account;
