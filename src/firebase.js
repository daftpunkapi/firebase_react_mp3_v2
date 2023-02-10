// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB833WphEJbuaQXmAsD2Wtv5v4yT0Ccv_A",
  authDomain: "mp3v2-kb.firebaseapp.com",
  projectId: "mp3v2-kb",
  storageBucket: "mp3v2-kb.appspot.com",
  messagingSenderId: "74889810893",
  appId: "1:74889810893:web:aafa695c2c65f8d60d6a84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
