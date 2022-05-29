import React, { useEffect, useState } from 'react'
import { sincronizeListOfPlayLists } from '../firebase/firestore'
import { IPlayList, IUser } from '../interfaces'

type Props = {
  listOfPlaylistOption : 0 | 1 | 2 | 3 | 4 | -1
  iuser : IUser| null
}

export default function useListOfPlayLists({listOfPlaylistOption, iuser}: Props) {

  const [listOfPlaylists, setListOfPlaylists] = useState<IPlayList[]>([])

  const isUserFaulty = iuser===null || iuser?.uid===""

  useEffect(() => {
    const unsuscribe = sincronizeListOfPlayLists(setListOfPlaylists, listOfPlaylistOption, iuser)
  
    return () => {
      //unsuscribe()
    }
  }, [])
  

  return {listOfPlaylists, isUserFaulty}
}