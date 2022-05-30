import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import { playlistConverterFromAny } from '../../firebase/lib'
import useUser from '../../hooks/useUser'

export default function PlaylistPage() {

  // const {id} = useParams()
  const {state} = useLocation()
  const pl = playlistConverterFromAny(state)
  const {loginUser, setIsAuth} = useUser()
  const [videoFocus, setVideoFocus] = useState(0)
 
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
            width="100%" 
            style={{aspectRatio:"112/63"}} 
            src={`https://www.youtube.com/embed/${pl.videos[videoFocus]}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </main>
        
      </div>
    </>)
}