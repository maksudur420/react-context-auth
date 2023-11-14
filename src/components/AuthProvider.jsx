
import { createContext, useState } from "react"
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Auth from "../firebase/firebase.config";

export const authContext = createContext(null)


const AuthProvider = ({children}) => {

    const [user, setUser] =useState(null)

    

    const createUser =(email,password)=>{
        return createUserWithEmailAndPassword(Auth, email,password)
    }

    const signInUser =(email,password)=>{
        return signInWithEmailAndPassword(Auth,email,password)
    }
    const authInfo ={user,createUser,signInUser}

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