import { User } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs, addDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { EMPTY_USER_TYPE, IPlayList, IUser, IVideos } from "../interfaces";
import { logout } from "./auth";
import { app } from './init'
import { playlistConverter, userConverter, videoConverter } from "./lib";

export const db = getFirestore(app)

/**
 * CRUD users
 */
export const gettingUserFromDB = (
  luser: User| EMPTY_USER_TYPE, 
  UseUserCallback: (value: SetStateAction<IUser | null>) => void,
  IsAuthLoadingCallBack: (value: SetStateAction<boolean>) => void,
  setIsAuth : (value: SetStateAction<boolean>) => void
  ) => {
  const docRef = doc(db, "users", luser.uid)
  IsAuthLoadingCallBack(true) // gestión del isloading user
  return getDoc(docRef)
    .then(docSnap => {
      const userToStore: IUser = {
        uid: luser.uid,
        name: luser.displayName ? luser.displayName : "",
        email: luser.email ? luser.email : "",
        photoURL: luser.photoURL ? luser.photoURL : "",
        following: [],
        followers: [],
        videoPlayLists: [],
        likedPlayLists:[]
      }
      if (docSnap.exists()) {
        UseUserCallback(userConverter(docSnap));
        IsAuthLoadingCallBack(false)
      } else {
        // store the new user
        setDoc(doc(db, "users", userToStore.uid), userToStore)
          .then(() => {
            UseUserCallback(userToStore);
            IsAuthLoadingCallBack(false)
          })
          .catch(onrejected => {
            console.error(onrejected)
            alert("Error conectando en la base de datos")
            logout(setIsAuth)
            UseUserCallback(null)
            IsAuthLoadingCallBack(false) // ante el error, damos logout al user
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

export const getAnotherUser = (
  uid: string, 
  callbackUser: (value: SetStateAction<IUser | null>) => void, 
  IsOtherUserCallback: (value: SetStateAction<boolean>) => void,
  navigate: NavigateFunction
  ) => {
  const docRef = doc(db, "users", uid)
  IsOtherUserCallback(true) // gestión del isloading user
  return getDoc(docRef)
    .then((docData) => {
      if (docData.exists()) {
        callbackUser(userConverter(docData))
        IsOtherUserCallback(false)
      } else {
        callbackUser(null)
        IsOtherUserCallback(false)
        navigate("/notfound")
      }
    })
    .catch(err => {
      console.error(err);
      callbackUser(null)
      IsOtherUserCallback(false)
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

/**
 * CRUD playlists
 */

export const addNewPlayList = (
  playlist : IPlayList, 
  callBackModal : (b:boolean)=>void,
  SetUserCallBack : Dispatch<SetStateAction<IUser|null>>,
  iuser :IUser
) => {
  return addDoc(collection(db, 'playlists'), playlist)
          .then((snapShot)=>{
            const ref = doc(db, 'playlists', snapShot.id)
            updateDoc(ref, {plid: snapShot.id})            
            callBackModal(true)
            const updatedUser :IUser = {
              ...iuser,
              videoPlayLists:iuser.videoPlayLists.concat([snapShot.id])
            } 
            SetUserCallBack(updatedUser)
            UpdateUser(updatedUser)          
          })
}

export const updatePlayList = (playlist: IPlayList) => {
  return setDoc(doc(db, "playlists", playlist.plid), playlist)
}

export const sincronizePlayList = (plid : string, SetStateCallBack : Dispatch<IPlayList|null|undefined>) => {
  return onSnapshot(doc(db, 'playlists', plid), (doc)=> {
    if(doc.exists()) {
      SetStateCallBack(playlistConverter(doc.data()))
    }
  }) 
}

/**
 * CRUD videos
 */
 export const addNewVideo = (
  video : IVideos, 
  callBackModal : (b:boolean)=>void,
  SetIsLoadingCallBack : Dispatch<SetStateAction<boolean>>,
) => {
  return  setDoc(doc(db, "videos", video.vid), video)
          .then((snapShot)=>{
            callBackModal(true)
            SetIsLoadingCallBack(false)          
          })
          .catch( err =>{
            console.error('error', err);
            SetIsLoadingCallBack(false)
          })
} 

export const addNewVideoFromDB = (
  video : IVideos, // ya viene con uid y plid incluido
  playlist: IPlayList, // ya viene con vid en videos desde FetchYoutubeInfo
  callBackModal : (b:boolean)=>void,
  SetIsLoadingCallBack : Dispatch<SetStateAction<boolean>>
) => {
  const docRef = doc(db, "videos", video.vid)
  return getDoc(docRef)
  .then(docSnap => {
    if (docSnap.exists()) {
      const storedvideo = videoConverter(docSnap.data())
      storedvideo.plids.push(playlist.plid)
      if (!storedvideo.uids.includes(playlist.uid)) {
        storedvideo.uids.push(playlist.uid)
      }
      updatePlayList(playlist)
      addNewVideo(storedvideo, callBackModal, SetIsLoadingCallBack)
    } else {
      updatePlayList(playlist)
      addNewVideo(video, callBackModal, SetIsLoadingCallBack)
    }
  })
  .catch(err=>{
    console.log(err);
    alert("Error conectando con la colección videos")
    SetIsLoadingCallBack(false)
  })
}

