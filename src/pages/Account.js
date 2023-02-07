import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Account = () => {

    const {logOut, user} = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error)
        }
    }
    
    const room1entry = async () => {
        try{
            await navigate('/accountpage/room1');
        } catch (error) {
            console.log(error);
        }
    }

    const room2entry = async () => {
      try{
          await navigate('/accountpage/room2');
      } catch (error) {
          console.log(error);
      }
  }

    return (
    <div>
        <h2>Account Page</h2>
        <p> Welcome, {user ? user.displayName : "Guest"}</p>
        <button onClick={handleSignOut}>Logout</button>
        <p>Please enter a room to enter into a Multiplayer Session</p>
        <button onClick={room1entry}>Room 1</button>
        <button onClick={room2entry}>Room 2</button>
    </div>
    );
};

export default Account;