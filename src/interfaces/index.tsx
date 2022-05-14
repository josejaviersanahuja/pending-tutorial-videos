import { User } from "firebase/auth"

/**
 * Encargado de la gestión del avatar, el estado logged in o logged out
 */
export interface ILoginUser {
    name: string | null,
    email: string | null,
    photoURL: string | null,
    uid : string
}

/**
 * Encargado de las llamadas a firestore para traer las colecciones
 */
export interface IUser {
    
}

/**
 * Encargado de settear y pasar User a IUser e ILoginUser
 */
export type TwoFunctionsInOne = (firebaseUser : User | null | undefined) => void