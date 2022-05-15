import { User } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { SetStateAction } from "react";
import { IUser } from "../interfaces";
import {app} from './init'

export const db = getFirestore(app)

/**
 * CRUD users
 */
 export const gettingUserFromDB = (luser: User, UseUserCallback : (value: React.SetStateAction<IUser | null| undefined>) => void) => {

    const docRef = doc(db, "users", luser.uid)
    UseUserCallback(undefined)
    return getDoc(docRef)
            .then( docSnap => {
                const userToStore : IUser = {
                    uid : luser.uid,
                    name : luser.displayName? luser.displayName :"" ,
                    email : luser.email ? luser.email : "",
                    photoURL : luser.photoURL ? luser.photoURL : "",
                    following: [],
                    followers: [],
                    videoCollections:[]
                  }
                if (docSnap.exists()) {
                    userToStore.followers = docSnap.data().followers;
                    userToStore.following = docSnap.data().following;
                    userToStore.videoCollections = docSnap.data().videoCollections;                    
                } else {
                    // @TODO store the new user
                }
                UseUserCallback(userToStore);
            })
            .catch(err=>{
                console.error(err);
                UseUserCallback(null)
            })
  }