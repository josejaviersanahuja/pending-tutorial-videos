import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import { playlistConverterFromAny } from '../../firebase/lib'
import useSincronizePlaylist from '../../hooks/useSincronizePlaylist'
import useUser from '../../hooks/useUser'
import { IVideos } from '../../interfaces'
import SmallVideoCard from './SmallVideoCard'

export default function PlaylistPage() {

  // const {id} = useParams()
  const {state} = useLocation()
  const pl = playlistConverterFromAny(state)
  const {loginUser, setIsAuth} = useUser()
  const [videoFocus, setVideoFocus] = useState(0)

  // con esto vamos a traer de firestore los videos del playlist de la coleccion videos
  const [allVideos, setallVideos] = useState<IVideos[]>([])
  useSincronizePlaylist({plid:pl.plid, initialPlaylist:pl, setallVideos})
 
  if (pl.videos.length === 0) return <Navigate to="/" replace/>
  return (<>
      <div className='playlistpage'>
        <Header
          loginUser={loginUser}
          title={pl.name.substring(0,20)}
          setIsAuth={setIsAuth}
        />
        <main className='playlistpage__main'>
          <iframe 
            src={`https://www.youtube.com/embed/${pl.videos[videoFocus]}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          <div className='small__videocard__wrapper'>
          {allVideos.map((v, i)=> <SmallVideoCard key={v.vid} v={v} index={i} videoFocus={videoFocus} setVideoFocus={setVideoFocus}/>)}
          </div>
        </main>
        
      </div>
    </>)
}