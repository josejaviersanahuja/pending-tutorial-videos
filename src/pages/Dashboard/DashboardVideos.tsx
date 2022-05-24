import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { sincronizeVideosInPlayList } from '../../firebase/firestore'
import { playlistConverterFromAny } from '../../firebase/lib'
import { EMPTY_PLAYLIST, IVideos } from '../../interfaces'
import AddVideoComponent from './AddVideoComponent'
import VideoCards from './VideoCards'

export default function DashboardVideos() {

  const {state} = useLocation()
  const playlist = typeof state == 'object' ? playlistConverterFromAny(state) : EMPTY_PLAYLIST
  const [allVideos, setallVideos] = useState<IVideos[]>([])

  useEffect(() => {
    const unsuscribe = sincronizeVideosInPlayList(playlist, setallVideos)
  
    return () => {
      unsuscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setallVideos])
  console.log("a");
  
  return (<>
    <h4>Playlist {playlist.name}</h4>
    <div className='videocard__wrapper'>
      {
        playlist.videos.length > 0 
        ? allVideos.map((e,i)=> <VideoCards key={i} video={e}/>)
         : <p>Aún no hay vídeos aquí</p>  
      }
    </div>
    <AddVideoComponent playlist={playlist}/>
  </>)
}