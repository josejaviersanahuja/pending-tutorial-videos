import { getAuth, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {app as firebaseApp} from './init'

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  // Check for user status
  console.log(user);
});

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

export const logout = () => {
    return auth.signOut()
  }
