import '../App.css';
import {GoogleButton} from 'react-google-button';
import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



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