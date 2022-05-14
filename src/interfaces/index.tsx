import { User } from "firebase/auth"

export interface ILoginUser {
    name: string | null,
    email: string | null,
    photoURL: string | null,
    uid : string
}

export interface IUser {
    
}

export type TwoFunctionsInOne = (firebaseUser : User | null | undefined) => void