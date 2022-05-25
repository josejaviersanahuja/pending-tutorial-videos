import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sincronizePlayList } from '../../firebase/firestore'
import { playlistConverterFromAny } from '../../firebase/lib'
import EditIcon from '../../icons/EditIcon'
import SaveIcon from '../../icons/SaveIcon'
import { EMPTY_PLAYLIST, IPlayList, IVideos } from '../../interfaces'
import AddVideoComponent from './AddVideoComponent'
import VideoCards from './VideoCards'

export default function DashboardVideos() {

  const {state} = useLocation()
  const playlist = typeof state == 'object' ? playlistConverterFromAny(state) : EMPTY_PLAYLIST
  const [sincronizedPlaylist, setSincronizedPlaylist] = useState<IPlayList>(playlist)
  const [allVideos, setallVideos] = useState<IVideos[]>([])
  const [isEditionMode, setIsEditionMode] = useState(false)

  useEffect(() => {
    const unsuscribePlayList = sincronizePlayList(playlist.plid, setSincronizedPlaylist, setallVideos)
    
    return () => {
      unsuscribePlayList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setallVideos, setSincronizedPlaylist])
  console.log(allVideos, sincronizedPlaylist);
  
  return (<>
    <h4>Playlist {playlist.name}</h4>
    <div className='videocard__wrapper'>
      {
        sincronizedPlaylist.videos.length > 0 
        ? allVideos.map((e,i)=> {
          return <VideoCards 
            key={i} 
            video={e} 
            playlist={sincronizedPlaylist} 
            setSincronizedPlaylist={setSincronizedPlaylist}
            isEditionMode={isEditionMode}
            />
        })
          : <p>Aún no hay vídeos aquí</p>  
      }
    </div>
    {!isEditionMode && <AddVideoComponent playlist={sincronizedPlaylist}/>}
    {
      !isEditionMode && 
      <button 
        className='dashboard__video__btn'
        style={{left:"2rem"}}
        onClick={() => {setIsEditionMode(!isEditionMode)}} 
      >
        <EditIcon width={48} height={48} />
      </button>
    }
    {
      isEditionMode &&
      <button 
        className='dashboard__video__btn'
        style={{left:"2rem"}}
        onClick={() => {setIsEditionMode(!isEditionMode)}} 
      >
        <SaveIcon width={48} height={48} />
      </button> 
    }
  </>)
}