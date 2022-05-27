import React, { Dispatch, useState } from 'react'
import { deleteVideoFromPlaylist, updatePlayList } from '../../../firebase/firestore'
import ArrowDown from '../../../icons/ArrowDown'
import ArrowUp from '../../../icons/ArrowUp'
import DeleteIcon from '../../../icons/DeleteIcon'
import { IPlayList, IVideos } from '../../../interfaces'

type Props = {
  video: IVideos
  playlist: IPlayList
  setSincronizedPlaylist: Dispatch<IPlayList>
  setIsDeletingVideo : Dispatch<boolean>
}

export default function BotonosEnVideoCards({video, playlist, setSincronizedPlaylist, setIsDeletingVideo}: Props) {

  const [blockButtons, setBlockButtons] = useState(false)
  
  const getIndex = () => {
    return playlist.videos.indexOf(video.vid)
  }

  const handleDeleteVideo = () => {
    setIsDeletingVideo(true)
    deleteVideoFromPlaylist(video, playlist)
    .then(()=>setIsDeletingVideo(false))
    .catch(()=>setIsDeletingVideo(false))
  }

  const handleDownArrow = () => {
    setBlockButtons(true)
    const index = getIndex()
    playlist.videos[index] = playlist.videos[index+1]
    playlist.videos[index+1] = video.vid
    setSincronizedPlaylist(playlist)
    updatePlayList(playlist)
    .then(()=>setBlockButtons(false))
    .catch(()=>setBlockButtons(false))
  }
  
  const handleUpArrow = () => {
    setBlockButtons(true)
    const index = getIndex()
    playlist.videos[index] = playlist.videos[index-1]
    playlist.videos[index-1] = video.vid
    setSincronizedPlaylist(playlist)
    updatePlayList(playlist)
    .then(()=>setBlockButtons(false))
    .catch(()=>setBlockButtons(false))
  }

  return (
    <>
      {
        getIndex() !== 0 && 
        <button 
          className='subir' 
          onClick={handleUpArrow} 
          disabled={blockButtons}
        >
          <ArrowUp />
        </button>
      }
      <button className='eliminar' onClick={handleDeleteVideo} disabled={blockButtons}><DeleteIcon /></button>
      {
        getIndex() !== (playlist.videos.length - 1) && 
        <button 
          className='bajar' 
          onClick={handleDownArrow} 
          disabled={blockButtons}
        >
          <ArrowDown />
        </button>
      }
    </>
  )
}