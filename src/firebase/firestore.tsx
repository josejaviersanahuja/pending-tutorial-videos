import { User } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs, addDoc, updateDoc, onSnapshot, writeBatch, orderBy, limit } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { EMPTY_USER_TYPE, IPlayList, IUser, IVideos, OPTIONS_FOR_LISTOFPLAYLIST } from "../interfaces";
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

export const getUser = (
  uid: string, 
  callbackUser: (value: SetStateAction<IUser | null>) => void,
  IsLoadingCallback: (value: SetStateAction<boolean>) => void,
) => {
  const docRef = doc(db, "users", uid)
  IsLoadingCallback(true) // gestión del isloading user
  return getDoc(docRef)
    .then((docData) => {
      if (docData.exists()) {
        callbackUser(userConverter(docData))
        IsLoadingCallback(false)
      } else {
        callbackUser(null)
        IsLoadingCallback(false)
      }
    })
    .catch(err => {
      console.error(err);
      callbackUser(null)
      IsLoadingCallback(false)
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

export const sincronizePlayList = (
  plid : string, 
  SetStateCallBack : Dispatch<IPlayList>,
  SetVideosFromYoutube : Dispatch<IVideos[]> | undefined
  ) => {
  return onSnapshot(doc(db, 'playlists', plid), (doc)=> {
    if(doc.exists()) {
      const newplaylist = playlistConverter(doc.data())
      SetStateCallBack(newplaylist)
      if (SetVideosFromYoutube !== undefined) {
        getVideosInPlayList(newplaylist, SetVideosFromYoutube)
      }
    }
  }) 
}

/**
 * delete playlist, solo puede activarse en un playlist vacío.
 * significa que el plid no existe en ningún vídeo
 * significa que hay que ejecutar 2 acciones nada más
 * 1. borrar el plid en user.videoPlaylists, por eso el SetUserCallBack
 * 2. borrar el documento plid en playlists
 */
export const deletePlayList = (playlist: IPlayList, iuser: IUser, SetUserCallBack : Dispatch<IUser|null>) => {
  iuser.videoPlayLists = iuser.videoPlayLists.filter(e=> e!== playlist.plid)
  const userRef = doc(db, "users", playlist.uid)
  const playlisRef = doc(db, "playlists", playlist.plid)
  const batch = writeBatch(db)
  batch.delete(playlisRef)
  batch.set(userRef, iuser)
  return batch.commit()
        .then(()=>{
          SetUserCallBack(iuser)
        })
        .catch(()=>{
          alert("batch deleting playlist error")
        })
}

export const sincronizeListOfPlayLists = (setListOfPlaylists:Dispatch<IPlayList[]>, options : 0|1|2|3|4|-1, iuser : IUser|null) => {
  // if home and user falsy
  let constraint = where("numLikes", ">=", 0)
  // if home and user truthy
  if (options === OPTIONS_FOR_LISTOFPLAYLIST["HomeAndUserTruthy"]) {
    if (iuser && iuser.following.length > 0) {
      constraint = where("uid", "in", iuser.following)
    }
  }
  // if userpage current user or other user
  if (options === OPTIONS_FOR_LISTOFPLAYLIST["UserPageCurrentUser"] || options === OPTIONS_FOR_LISTOFPLAYLIST["UserPageOtherUser"]) {
    if (iuser) {
      constraint = where("uid", "==", iuser.uid)
    }
  }

  const q = query(collection(db, "playlists"), constraint, orderBy("numLikes","desc"), limit(10));
  return onSnapshot(q, (snapShot)=>{
    const listOfPlaylist : IPlayList[] = []
    snapShot.forEach((pldoc)=>{
      listOfPlaylist.push(playlistConverter(pldoc.data()))
    })
    setListOfPlaylists(listOfPlaylist)
  })
}

/**
 * CRUD videos
 */

/**
 * Este método se ejecuta cuando queremos añadir un vídeo nuevo a un playlist.
 * No se usa addNewVideo porque no vamos añadir un video que ya exista en el playlist de otro usuario.
 * Primero revisamos si existe el vídeo en la colección videos
 * Si existe, hacemos update con nuevos datos.
 * Si no, lo añadimos
 * @param video es el nuevo valor de que deberá tener en la base de datos
 * @param playlist es el nuevo valor del playlist, ya con el video incluido
 * @param callBackModal va a cerrar el form de donde se añadió el video
 * @param SetIsLoadingCallBack va a avisar cuando termina la transacción
 * @returns 
 */
export const addNewVideoFromDB = (
  video : IVideos, // ya viene con uid y plid incluido
  playlist: IPlayList, // ya viene con vid en videos desde FetchYoutubeInfo
  callBackModal : (b:boolean)=>void,
  SetIsLoadingCallBack : Dispatch<SetStateAction<boolean>>
) => {
  const docRef = doc(db, "videos", video.vid)
  return getDoc(docRef)
  .then(docSnap => {
    // escritura en lotes inicializada
    const batch = writeBatch(db)
    const playlistRef = doc(db, 'playlists', playlist.plid)
    const videoRef = doc(db, 'videos', video.vid)
    batch.set(playlistRef, playlist)
      
    if (docSnap.exists()) {
      const storedvideo = videoConverter(docSnap.data())
      storedvideo.plids.push(playlist.plid) // en el front se controla que solo haya 1 playlist. significa que no puede repetirse un video dentro del mismo playlist
      storedvideo.uids.push(playlist.uid) // puede repetirse el uid en uids. un uid repetido 3 veces significaría que el vídeo aparece en 3 playlist distintos del mismo usuario
      // si el video existia modificalo
      batch.set(videoRef, storedvideo)    
    } else {
      batch.set(videoRef, video)
    }
    // commit escritura en lote
    batch.commit()
      .then(()=>{
        callBackModal(true)
        SetIsLoadingCallBack(false)
      })
      .catch(()=>{
        SetIsLoadingCallBack(false)
        alert("batch setnewvideo failed")
      })
  })
  .catch(err=>{
    console.error(err);
    alert("Error conectando con la colección videos")
    SetIsLoadingCallBack(false)
  })
}

// no usado aún 24/05 02:42
export const getVideo = (
  vid: string, 
  SetVideoCallback: (value: SetStateAction<IVideos>) => void, 
  IsLoadingCallback: (value: SetStateAction<boolean>) => void
  ) => {
  const docRef = doc(db, "videos", vid)
  IsLoadingCallback(true) // gestión del isloading user
  return getDoc(docRef)
    .then((docData) => {
      if (docData.exists()) {
        SetVideoCallback(videoConverter(docData.data()))
        IsLoadingCallback(false)
      } else {
        IsLoadingCallback(false)
        alert(`El video con id ${vid} no existe en firestore`)
      }
    })
    .catch(err => {
      console.error(err);
      IsLoadingCallback(false)
      alert("Error conectando con la colección vídeos")
    })
}

// sinc videos en playlist
export const getVideosInPlayList = (
    playlist : IPlayList, 
    SetStateCallBack : Dispatch<IVideos[]>
  ) => {
    if (playlist.videos.length !== 0) {
      const q = query(collection(db, "videos"), where("vid", "in", playlist.videos));
      return getDocs(q)
            .then((querySnapshot) => {
              const videos : IVideos[] = [];
              querySnapshot.forEach((doc) => {
                const video = videoConverter(doc.data())
                const indexInPlayList = playlist.videos.indexOf(video.vid)
                  videos[indexInPlayList]=video;
              });

              SetStateCallBack(videos)
            }); 
    } else {
      
      return ()=>{}
    }
}

/**
 * Eliminar un vídeo de una playlist significa varias cosas
 * 1. en playlist coleccion, significa eliminar el vid en videos
 * 2. en video colection, significa eliminar el plid en plids
 * 3. en video colection, significa eliminar 1 uid en uids
 * @param video video a eliminar
 * @param playlist playlist donde se elimina
 * @returns 
 */
export const deleteVideoFromPlaylist = (video:IVideos, playlist:IPlayList) => {
  // 1
  const plvideos = playlist.videos.filter(e=> e!== video.vid)
  playlist.videos= plvideos
  // 2
  const videoplids= video.plids.filter(e=> e!== playlist.plid)
  video.plids= videoplids
  // 3
  const indexUID = video.uids.indexOf(playlist.uid)
  video.uids.splice(indexUID,1)
  
  const batch = writeBatch(db)
  const videoRef = doc(db, 'videos', video.vid)
  const playlistRef = doc(db, 'playlists', playlist.plid)

  batch.set(playlistRef, playlist)
  if (video.plids.length === 0) {
    batch.delete(videoRef)
  } else {
    batch.set(videoRef, video)
  }

  return batch.commit()
}