import { getAuth, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { TwoFunctionsInOne } from "../interfaces";
import {app as firebaseApp} from './init'

const auth = getAuth(firebaseApp);

export const authStateChanged = (useUserCallback : TwoFunctionsInOne) => {
    return onAuthStateChanged(auth, user => { useUserCallback(user)}); 
}

export const handleGithubLogIn = () => {
    const githubProvider = new GithubAuthProvider()
    return signInWithPopup(auth, githubProvider)
}

export const handleGoogleLogIn = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
}

export const handleFacebookLogIn = () => {
    const facebookProvider = new FacebookAuthProvider()
    return signInWithPopup(auth, facebookProvider)
}

export const logout = (setIsAuth : Dispatch<SetStateAction<boolean>>) => {
    setIsAuth(false)
    return auth.signOut()
  }
