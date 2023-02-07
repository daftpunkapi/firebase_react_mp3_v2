import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth } from '../firebase';


const AuthContext =  createContext ();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    
    const googelSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const logOut = () =>{
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value= {{googelSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth =() => {
    return useContext(AuthContext);
};