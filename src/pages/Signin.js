import React, { useEffect } from "react";
// import { GoogleButton } from 'react-google-button';
import { UserAuth } from "../context/AuthContext";
import '../App.css';
import { useNavigate } from "react-router-dom";
import {GoogleButton} from 'react-google-button';


const Signin = () => {
    const { googelSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try{
            await googelSignIn(); 
            navigate('/accountpage');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        if(user != null){
            navigate('/accountpage');
        }
    },[user, navigate]);

    return (
    <div className="App">
        <p> Please click on the button below to proceed </p>
        <div className="App-center">
        <GoogleButton onClick ={handleGoogleSignIn} />
        </div>
    </div>
    );
};

export default Signin;