import { User } from "firebase/auth"

/**
 * Encargado de las llamadas a firestore para traer las colecciones
 */
export interface IUser {
    uid : string,
    name : string,
    email : string,
    photoURL : string,
    following: string[],
    followers: string[],
    videoCollections:string[]
}

/**
 * Encargado de settear y pasar User a IUser e ILoginUser
 */
export type TwoFunctionsInOne = (firebaseUser : User | null) => void