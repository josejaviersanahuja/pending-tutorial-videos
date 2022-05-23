import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { playlistConverterFromAny } from '../../firebase/lib'
import { EMPTY_PLAYLIST } from '../../interfaces'
import AddVideoComponent from './AddVideoComponent'

export default function DashboardVideos() {

  const {state} = useLocation()
  const playlist = typeof state == 'object' ? playlistConverterFromAny(state) : EMPTY_PLAYLIST
  
  return (<>
    <h4>Playlist {playlist.name}</h4>
    <div className='videocard__wrapper'>
      {
        playlist.videos.length > 0 
        ? playlist.videos.map((e,i)=> <p key={i}>video cards</p>)
        : <p>Aún no hay vídeos aquí</p>  
      }
      <AddVideoComponent playlist={playlist}/>
    </div>
  </>)
}