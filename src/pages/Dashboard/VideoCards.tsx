import { Dispatch, useState } from 'react';
import { deleteVideoFromPlaylist, updatePlayList } from '../../firebase/firestore';
import { IDIOMA } from '../../firebase/lib';
import ArrowDown from '../../icons/ArrowDown';
import ArrowUp from '../../icons/ArrowUp';
import DeleteIcon from '../../icons/DeleteIcon';
import { IPlayList, IVideos } from '../../interfaces'

type Props = {
  video: IVideos
  playlist: IPlayList
  setSincronizedPlaylist: Dispatch<IPlayList>
  isEditionMode: boolean
}

export default function VideoCards({video, playlist, setSincronizedPlaylist, isEditionMode}: Props) {
  
  const [blockButtons, setBlockButtons] = useState(false)
  const [isDeletingVideo, setIsDeletingVideo] = useState(false)

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
  
  if (isDeletingVideo) return (
    <div className='videocard spinner'>
      <h4>.</h4>
      <img src={""} alt={"."} width={320} height={120}/>
      <p>.</p>
    </div>
  )
  return (
    <div className='videocard'>
      {
        isEditionMode && 
        <>
          {getIndex() !== 0 && <button className='subir' onClick={handleUpArrow} disabled={blockButtons}><ArrowUp/></button>}
          <button className='eliminar' onClick={handleDeleteVideo} disabled={blockButtons}><DeleteIcon/></button>
          {getIndex() !== (playlist.videos.length -1) && <button className='bajar' onClick={handleDownArrow} disabled={blockButtons}><ArrowDown/></button>} 
        </>
      }
      <h4>{video.title}</h4>
      <img src={video.imgUrl} alt={video.vid}/>
      <p>{IDIOMA[video.defaultLanguage]}</p>
    </div>
  )
}