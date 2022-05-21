import { DocumentData, DocumentSnapshot } from "firebase/firestore"
import { IPlayList, IUser } from "../interfaces"

/**
 * Convierte doc.data() de firestore en IUser
 */
export const userConverter = (doc: DocumentData): IUser => {
  const iuser: IUser = {
    email: typeof doc.data().email == 'string' ? doc.data().email : "",
    name: typeof doc.data().name == 'string' ? doc.data().name : "",
    photoURL: typeof doc.data().photoURL == 'string' ? doc.data().photoURL : "",
    uid: typeof doc.data().uid == 'string' ? doc.data().uid : "",
    followers: Array.isArray(doc.data().followers) ? doc.data().followers : [],
    following: Array.isArray(doc.data().following) ? doc.data().following : [],
    videoPlayLists: Array.isArray(doc.data().videoPlayLists) ? doc.data().videoPlayLists : [],
    likedPlayLists: Array.isArray(doc.data().likedPlayLists) ? doc.data().likedPlayLists : []
  }
  return iuser
}

/**
 * Convierte doc : any  en IUser
 */
export const userConverterFromAny = (doc: any): IUser => {
  const iuser: IUser = {
    email: typeof doc.email == 'string' ? doc.email : "",
    name: typeof doc.name == 'string' ? doc.name : "",
    photoURL: typeof doc.photoURL == 'string' ? doc.photoURL : "",
    uid: typeof doc.uid == 'string' ? doc.uid : "",
    followers: Array.isArray(doc.followers) ? doc.followers : [],
    following: Array.isArray(doc.following) ? doc.following : [],
    videoPlayLists: Array.isArray(doc.data().videoCollections) ? doc.data().videoCollections : [],
    likedPlayLists: Array.isArray(doc.data().likedPlayLists) ? doc.data().likedPlayLists : []
  }

  return iuser
}

export const playlistConverter = (doc: DocumentSnapshot<DocumentData>) : IPlayList => {
  const ipl : IPlayList = {
    description: typeof doc.data().description == 'string' ? doc.data().description: "",
    imgUrl: typeof doc.data().imgUrl == 'string' ? doc.data().imgUrl: "",
    likes: Array.isArray(doc.data().likes) ? doc.data().likes : [],
    name: typeof doc.data().name == 'string' ? doc.data().name : "",
    plid: typeof doc.data().plid == 'string' ? doc.data().plid : "",
    uid: typeof doc.data().uid == 'string'? doc.data().uid : "",
    videos: Array.isArray(doc.data().videos) ? doc.data().videos: []
  }
  return ipl
}