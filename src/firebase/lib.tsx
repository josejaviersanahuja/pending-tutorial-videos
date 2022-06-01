import { DocumentData } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { EMPTY_PLAYLIST, IPlayList, IUser, IVideos } from "../interfaces"
import { YOUTUBE_API_KEY } from "./config"
import { addNewVideoFromDB } from "./firestore"

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
    videoPlayLists: Array.isArray(doc.videoCollections) ? doc.videoCollections : [],
    likedPlayLists: Array.isArray(doc.likedPlayLists) ? doc.likedPlayLists : []
  }

  return iuser
}

export const playlistConverter = (doc: DocumentData) : IPlayList => {
  const ipl : IPlayList = { 
    description: typeof doc.description == 'string' ? doc.description: "",
    imgUrl: typeof doc.imgUrl == 'string' ? doc.imgUrl: "",
    likes: Array.isArray(doc.likes) ? doc.likes : [],
    name: typeof doc.name == 'string' ? doc.name : "",
    plid: typeof doc.plid == 'string' ? doc.plid : "",
    uid: typeof doc.uid == 'string'? doc.uid : "",
    videos: Array.isArray(doc.videos) ? doc.videos: [],
    numLikes: Array.isArray(doc.likes) ? doc.likes.length : 0,
  }
  return ipl
}

export const playlistConverterFromAny = (doc: any) : IPlayList => {
  if (!doc) return EMPTY_PLAYLIST
  const ipl : IPlayList = { 
    description: typeof doc.description == 'string' ? doc.description: "",
    imgUrl: typeof doc.imgUrl == 'string' ? doc.imgUrl: "",
    likes: Array.isArray(doc.likes) ? doc.likes : [],
    name: typeof doc.name == 'string' ? doc.name : "",
    plid: typeof doc.plid == 'string' ? doc.plid : "",
    uid: typeof doc.uid == 'string'? doc.uid : "",
    videos: Array.isArray(doc.videos) ? doc.videos: [],
    numLikes: Array.isArray(doc.likes) ? doc.likes.length : 0
  }
  return ipl
}

const YOUTUBE_API_BASE_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${YOUTUBE_API_KEY}&id=`

export const FetchYoutubeInfo = (
    cod:string,
    playlist :IPlayList,
    ToggleModalCallback : (v:boolean) => void,
    SetIsLoadingCallback : Dispatch<SetStateAction<boolean>>
  ) => {
  SetIsLoadingCallback(true)
  const requestOptions : RequestInit= {
    method: 'GET',
    redirect: 'follow'
  };
  return  fetch(YOUTUBE_API_BASE_URL+cod, requestOptions)
    .then(response => response.json())
    .then(result => {      
      const newvideo = convertFetchedYoutubeResult(result.items[0])
      newvideo.plids.push(playlist.plid)
      newvideo.uids.push(playlist.uid)
      const newplaylist : IPlayList= {
        ...playlist,
        videos: playlist.videos.concat([newvideo.vid])
      }
      addNewVideoFromDB(newvideo, newplaylist, ToggleModalCallback, SetIsLoadingCallback)
    })
    .catch(error => {
      console.error('error', error)
      SetIsLoadingCallback(false)
      alert("Error retriving data from youtube")
    });
}

const convertFetchedYoutubeResult = (algo: any) : IVideos => {
  const newvideo : IVideos = {
    vid: "",
    plids: [] ,
    uids: [],
    title: "",
    description: "",
    imgUrl: "",
    defaultLanguage:""
  }
  //console.log(algo, "Lo que trae youtube api");
  
  if ( algo && algo.id 
    && algo.snippet 
    && algo.snippet.title
    && algo.snippet.description
    && algo.snippet.thumbnails
    && algo.snippet.thumbnails.medium
    && algo.snippet.thumbnails.medium.url
    ) {
      newvideo.vid= typeof algo.id == "string"? algo.id : ""
      newvideo.title= typeof algo.snippet.title == "string"? algo.snippet.title : ""
      newvideo.defaultLanguage= (typeof algo.snippet.defaultLanguage == "string" || typeof algo.snippet.defaultAudioLanguage == "string")? algo.snippet.defaultLanguage || algo.snippet.defaultAudioLanguage  : ""
      newvideo.description= typeof algo.snippet.description == "string"? algo.snippet.description : ""
      newvideo.imgUrl= typeof algo.snippet.thumbnails.medium.url == "string"? algo.snippet.thumbnails.medium.url : ""
    }
    return newvideo
}

export const videoConverter = (doc: DocumentData) : IVideos => {
  const ivideo : IVideos = { 
    description: typeof doc.description == 'string' ? doc.description: "",
    imgUrl: typeof doc.imgUrl == 'string' ? doc.imgUrl: "",
    plids: Array.isArray(doc.plids) ? doc.plids : [],
    title: typeof doc.title == 'string' ? doc.title : "",
    defaultLanguage: typeof doc.defaultLanguage == 'string' ? doc.defaultLanguage : "",
    vid: typeof doc.vid == 'string'? doc.vid : "",
    uids: Array.isArray(doc.uids) ? doc.uids: []
  }
  return ivideo
}

export const IDIOMA : {[index:string]: string} = {
  "es" : "(Español)",
  "en" : "(Inglés)",
  "" : "N/S"
}