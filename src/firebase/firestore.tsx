import { User } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { SetStateAction } from "react";
import { IUser } from "../interfaces";
import {app} from './init'

export const db = getFirestore(app)

/**
 * CRUD users
 */
 export const gettingUserFromDB = (luser: User, UseUserCallback : (value: SetStateAction<IUser | null| undefined>) => void) => {
    const docRef = doc(db, "users", luser.uid)
    UseUserCallback(undefined) // gestión del isloading user
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
                    // store the new user
                    setDoc(doc(db, "users", userToStore.uid), userToStore)
                        .then(() => {
                            console.log("entor aqui esta vez?");
                            alert("user stored")
                        })
                        .catch(onrejected => {
                            console.error(onrejected)
                            alert(`El nuevo usuario no se pudo crear en nuestra base de datos. Haga logout y vuelva a intentarlo`)
                        })
                }
                UseUserCallback(userToStore);
            })
            .catch(err=>{
                console.error(err);
                UseUserCallback(null) // ante el error, damos logout al user
            })
  }