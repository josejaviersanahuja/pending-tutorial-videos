import { DocumentData } from "firebase/firestore"
import { IUser } from "../interfaces"

/**
 * Convierte doc.data() de firestore en IUser
 */
export const userConverter = (doc : DocumentData) : IUser => {
    const iuser : IUser = {
        email: typeof doc.data().email == 'string' ?  doc.data().email : "",
        name: typeof doc.data().name == 'string' ?  doc.data().name : "",
        photoURL: typeof doc.data().photoURL == 'string' ?  doc.data().photoURL : "",
        uid: typeof doc.data().uid == 'string' ?  doc.data().uid : "",
        followers: Array.isArray(doc.data().followers) ?  doc.data().followers : [],
        following: Array.isArray(doc.data().following) ?  doc.data().following : [],
        videoCollections: Array.isArray(doc.data().videoCollections) ?  doc.data().videoCollections : []
    }
    return iuser
}

/**
 * Convierte doc : any  en IUser
 */
export const userConverterFromAny = (doc : any) : IUser => {
    const iuser : IUser = {
        email: typeof doc.email == 'string' ?  doc.email : "",
        name: typeof doc.name == 'string' ?  doc.name : "",
        photoURL: typeof doc.photoURL == 'string' ?  doc.photoURL : "",
        uid: typeof doc.uid == 'string' ?  doc.uid : "",
        followers: Array.isArray(doc.followers) ?  doc.followers : [],
        following: Array.isArray(doc.following) ?  doc.following : [],
        videoCollections: Array.isArray(doc.videoCollections) ?  doc.videoCollections : []
    }

    return iuser
}