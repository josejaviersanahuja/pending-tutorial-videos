import { User } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../interfaces";
import { logout } from "./auth";
import { app } from './init'
import { userConverter } from "./lib";

export const db = getFirestore(app)

/**
 * CRUD users
 */
export const gettingUserFromDB = (luser: User, UseUserCallback: (value: SetStateAction<IUser | null | undefined>) => void) => {
  const docRef = doc(db, "users", luser.uid)
  UseUserCallback(undefined) // gestión del isloading user
  return getDoc(docRef)
    .then(docSnap => {
      const userToStore: IUser = {
        uid: luser.uid,
        name: luser.displayName ? luser.displayName : "",
        email: luser.email ? luser.email : "",
        photoURL: luser.photoURL ? luser.photoURL : "",
        following: [],
        followers: [],
        videoCollections: []
      }
      if (docSnap.exists()) {
        UseUserCallback(userConverter(docSnap));
      } else {
        // store the new user
        setDoc(doc(db, "users", userToStore.uid), userToStore)
          .then(() => {
            UseUserCallback(userToStore);
          })
          .catch(onrejected => {
            console.error(onrejected)
            alert("Error conectando en la base de datos")
            logout()
            UseUserCallback(null) // ante el error, damos logout al user
          })
      }
    })
    .catch(err => {
      console.error(err);
      UseUserCallback(null) // ante el error, damos logout al user
    })
}

export const getAllUsers = (callbackAU: (value: SetStateAction<IUser[]>) => void, callbackLoading: (value: SetStateAction<boolean>) => void) => {
  const q = query(collection(db, "users"));
  callbackLoading(true)
  return getDocs(q)
    .then(snapShot => {
      const arr: IUser[] = []
      snapShot.forEach((doc) => {
        arr.push(userConverter(doc))
      })
      callbackAU(arr)
      callbackLoading(false)
    })
    .catch(err => {
      console.error(err, 'en getAllUsers');
      callbackAU([])
      callbackLoading(false)
    })

}

export const getAnotherUser = (uid: string, callbackUser: (value: SetStateAction<IUser | null | undefined>) => void, navigate: NavigateFunction) => {
  const docRef = doc(db, "users", uid)
  callbackUser(undefined) // gestión del isloading user
  return getDoc(docRef)
    .then((docData) => {
      if (docData.exists()) {
        callbackUser(userConverter(docData))
      } else {
        callbackUser(null)
        navigate("/notfound")
      }
    })
    .catch(err => {
      console.error(err);
      callbackUser(null)
    })
}

export const getUsersInList = (list: string[], ComponentCallBack: (value: SetStateAction<IUser[]>) => void) => {
  const q = query(collection(db, "users"), where("uid", "in", list));

  return getDocs(q)
    .then(qSnapShot => {
      const arr: IUser[] = []
      qSnapShot.forEach((doc) => {
        arr.push(userConverter(doc))
      })
      ComponentCallBack(arr)
    })
}

export const UpdateUser = (iuser: IUser) => {

  return setDoc(doc(db, "users", iuser.uid), iuser)
}