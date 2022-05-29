import { User } from "firebase/auth"

/**
 * Encargado de las llamadas a firestore para traer las colecciones
 */
export interface IUser {
  uid: string,
  name: string,
  email: string,
  photoURL: string,
  following: string[],
  followers: string[],
  videoPlayLists: string[],
  likedPlayLists: string[]
}

/**
 * Encargado de settear y pasar User a IUser e ILoginUser
 */
export type TwoFunctionsInOne = (firebaseUser: User | null| EMPTY_USER_TYPE) => void

export interface IPlayList {
  plid: string,
  uid: string,
  name: string,
  description: string,
  imgUrl: string,
  likes: string[]
  videos: string[]
  numLikes: number
}

export const EMPTY_IUSER : IUser = {
  email:"",
  followers:[],
  following:[],
  likedPlayLists:[],
  name:"",
  photoURL:"",
  uid:"",
  videoPlayLists:[]
}

export type EMPTY_USER_TYPE = {
  displayName:string,
  email:string,
  photoURL:string,
  uid:string
}

export const EMPTY_USER : EMPTY_USER_TYPE= {
  displayName:"",
  email:"",
  photoURL:"",
  uid:""
}

export const EMPTY_PLAYLIST : IPlayList= {
  plid: "",
  uid: "",
  name: "",
  description: "",
  imgUrl: "",
  likes: [],
  videos: [],
  numLikes: 0
}

export interface IVideos {
  vid:string,
  plids: string[] ,
  uids: string[],
  title: string,
  description: string,
  imgUrl: string // 320x180
  defaultLanguage: string
}

export const EMPTY_VIDEO : IVideos = {
  defaultLanguage:"",
  description:"",
  imgUrl:"",
  plids:[],
  title:"",
  uids:[],
  vid:""
}

export const OPTIONS_FOR_LISTOFPLAYLIST : {[index:string]:0|1|2|3|4} = {
  "HomeAndUserTruthy" : 0,
  "HomeAndUserFalsy" : 1,
  "UserPageCurrentUser": 2,
  "UserPageOtherUser":3,
  "HomeSearch":4
}

/**
 * El onSnapShot de las playlist es reutilizado de acuerdo al lugar de donde se llama
 * y a las playlists que se buscan. Las playlists a traer varian en base a los parametros
 * @param path si se llama de la home o del userpage
 * @param user si el usuario está autenticado, o si buscamos las playlist de un usuario distinto
 * @param currentUser ? si buscamos un usuario distinto, quiero poder ver las playlists que me gustan
 * @param search ? para buscar playlists en base al texto
 * @returns 
 */
 export const ChooseOptionsForListOfPlaylist = (
  path : string, 
  user : IUser | null, 
  currentUser : IUser | null, 
  search : string | undefined
  ) : 0|1|2|3|4|-1=> {
    if (path ==="/") {
      const HOMESEARCH = "HomeSearch";
      if (typeof search == "string" && search) return OPTIONS_FOR_LISTOFPLAYLIST[HOMESEARCH]
      const HOME_AND_USER_FALSY = "HomeAndUserFalsy";
      if (user === null || user.uid === "") return OPTIONS_FOR_LISTOFPLAYLIST[HOME_AND_USER_FALSY]
      const HOME_AND_USER_TRUTHY = "HomeAndUserTruthy";
      if (user && user.uid) return OPTIONS_FOR_LISTOFPLAYLIST[HOME_AND_USER_TRUTHY]
    } else {
      if (currentUser && currentUser.uid) {
        const USERPAGE_OTHER_USER = "UserPageOtherUser";
        return OPTIONS_FOR_LISTOFPLAYLIST[USERPAGE_OTHER_USER]
      } else {
        const USERPAGE_CURRENT_USER = "UserPageCurrentUser";
        return OPTIONS_FOR_LISTOFPLAYLIST[USERPAGE_CURRENT_USER]
      }
    }
    return -1
}