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