import React from 'react'
import { IPlayList } from '../../interfaces'

type Props = {
  listPlaylist : IPlayList[]
}

export default function ListsOfPlaylists({listPlaylist}: Props) {
  console.log(listPlaylist);
  
  return (
    <div>ListsOfPlaylists</div>
  )
}