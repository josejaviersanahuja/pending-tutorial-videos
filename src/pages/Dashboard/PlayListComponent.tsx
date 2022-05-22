import React, { useEffect, useState } from 'react'
import { sincronizePlayList } from '../../firebase/firestore'
import FolderIcon from '../../icons/FolderIcon'
import LikeIcon from '../../icons/LikeIcon'
import VideosIcon from '../../icons/VideosIcon'
import { IPlayList } from '../../interfaces'

type Props = {
  plid : string
}

export default function PlayListComponent({plid}: Props) {

  const [playlist, setPlaylist] = useState<IPlayList| null | undefined>(null)

  useEffect(() => {
    const unsuscribe = sincronizePlayList(plid, setPlaylist)
  
    return () => {
      unsuscribe()
    }
  }, [plid])
  

  return (
    <div className='playlistcard'>
      <h3>{playlist?.name}</h3>
      <p>{playlist?.description}</p>
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{playlist?.likes.length}</button>
        <button><VideosIcon/>{playlist?.videos.length}</button>
      </div>
    </div>
  )
}