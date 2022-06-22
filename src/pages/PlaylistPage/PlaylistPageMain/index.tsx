import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useSincronizePlaylist from '../../../hooks/useSincronizePlaylist'
import { IPlayList, IVideos } from '../../../interfaces'
import SmallVideoCard from './SmallVideoCard'

type Props = {
  pl: IPlayList
}

export default function PlaylistPageMain({ pl }: Props) {
  
  const [videoFocus, setVideoFocus] = useState(0)
  const [allVideos, setallVideos] = useState<IVideos[]>([])
  useSincronizePlaylist({plid:pl.plid, initialPlaylist:pl, setallVideos})
 
  if (pl.videos.length === 0) {
    alert("Ese Playlist está vacío. Selecciona otro")
    return <Navigate to="/" replace/>
  }
  return (
    <main className='playlistpage__main'>
      <iframe
        src={`https://www.youtube.com/embed/${pl.videos[videoFocus]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className='small__videocard__wrapper'>
        {allVideos.map((v, i) => <SmallVideoCard key={v.vid} v={v} index={i} videoFocus={videoFocus} setVideoFocus={setVideoFocus} />)}
      </div>
    </main>
  )
}