
import { createContext, useState,useEffect } from "react"
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Auth from "../firebase/firebase.config";

export const authContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user, setUser] =useState(null)
    const [loading,setLoading] =useState(true)


    

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(Auth, email,password)
    }

    const signInUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(Auth,email,password)
    }
    // Sign in with google

    const signInWithGoogle =()=>{
        return signInWithPopup(Auth,googleProvider)
    }

    // Observe user state change
    useEffect(()=>{
          const unSubscribed=onAuthStateChanged(Auth, (currentUser)=>{
                console.log('current login user ',currentUser);
                setUser(currentUser)
                setLoading(false)
            })
            return ()=>{
                unSubscribed();
            }
    },[])

    const logOut =()=>{
        setLoading(true)
        return signOut(Auth);
    }
    const authInfo ={user,
        createUser,
        signInUser,
        signInWithGoogle,
        loading,
        logOut
    }

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider

AuthProvider.propTypes={
    children:PropTypes.node
}