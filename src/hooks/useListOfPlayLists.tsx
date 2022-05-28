import React, { useEffect, useState } from 'react'
import { sincronizeListOfPlayLists } from '../firebase/firestore'
import { IPlayList, IUser } from '../interfaces'

type Props = {
  listOfPlaylistOption : 0 | 1 | 2 
  iuser : IUser| null
}

export default function useListOfPlayLists({listOfPlaylistOption, iuser}: Props) {

  const [listOfPlaylists, setListOfPlaylists] = useState<IPlayList[]>([])

  useEffect(() => {
    const unsuscribe = sincronizeListOfPlayLists(setListOfPlaylists, listOfPlaylistOption, iuser)
  
    return () => {
      //unsuscribe()
    }
  }, [])
  

  return {listOfPlaylists}
}