import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sincronizePlayList } from '../../firebase/firestore'
import LikeIcon from '../../icons/LikeIcon'
import VideosIcon from '../../icons/VideosIcon'
import { EMPTY_PLAYLIST, IPlayList, IUser } from '../../interfaces'

type Props = {
  plid : string,
  iuser: IUser
}

export default function PlayListComponent({plid, iuser}: Props) {

  const [playlist, setPlaylist] = useState<IPlayList>(EMPTY_PLAYLIST)
  const navigate = useNavigate()
  
  useEffect(() => {
    const unsuscribe = sincronizePlayList(plid, setPlaylist, undefined)
  
    return () => {
      unsuscribe()
    }
  }, [plid])

  const handleClick = () => {
    navigate(`${plid}`, {state:playlist})
  }

  return (
    <div className='playlistcard' onClick={handleClick}>
      <h3>{playlist?.name}</h3>
      <p>{playlist?.description}</p>
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{playlist?.likes.length}</button>
        <button><VideosIcon/>{playlist?.videos.length}</button>
      </div>
    </div>
  )
}