import { Dispatch, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deletePlayList } from '../../../../firebase/firestore'
import { playlistConverterFromAny } from '../../../../firebase/lib'
import { EMPTY_PLAYLIST, IUser, IVideos } from '../../../../interfaces'
import AddVideoComponent from './AddVideoComponent'
import BackBtn from './BackBtn'
import EditBtn from './EditBtn'
import VideoCards from '../../VideoCards'
import useSincronizePlaylist from '../../../../hooks/useSincronizePlaylist'

type Props = {
  setUser : Dispatch<IUser|null>
  iuser: IUser
}

export default function DashboardVideos({setUser, iuser}:Props) {

  // trayendo el stado del playlist de la pagina dashboard
  const {state} = useLocation()
  const navigate = useNavigate()
  const playlist = typeof state == 'object' ? playlistConverterFromAny(state) : EMPTY_PLAYLIST

  // con esto vamos a traer de firestore los videos del playlist de la coleccion videos
  const [allVideos, setallVideos] = useState<IVideos[]>([])
  const {playlist: sincronizedPlaylist, setSincronizedPlaylist} = useSincronizePlaylist({plid:playlist.plid, initialPlaylist:playlist, setallVideos})
  
  // Lógica para mostrar btns de editar, o borrar
  const [isEditionMode, setIsEditionMode] = useState(false)
  const isEmptyPlaylist = sincronizedPlaylist.videos.length === 0
  useEffect(() => {
    if (isEmptyPlaylist) {
      setIsEditionMode(false)
    }
    // eslint-disable-next-line 
  }, [])

  // función para borrar el playlist
  const handleDeletePlaylist = ()=>{
    deletePlayList(playlist, iuser ,setUser)
    navigate("/dashboard")
  }
  
  return (<>
    <h4>Playlist {playlist.name}</h4>
    <div className='videocard__wrapper'>
      {
        !isEmptyPlaylist
        ? allVideos.map((e,i)=> {
          return <VideoCards 
            key={i} 
            video={e} 
            playlist={sincronizedPlaylist} 
            setSincronizedPlaylist={setSincronizedPlaylist}
            isEditionMode={isEditionMode}
            />
        })
          : <p>Aún no hay vídeos aquí. Quieres borrar este playlist? <button onClick={handleDeletePlaylist}>Borrar</button></p>  
      }
    </div>
    {!isEditionMode && <AddVideoComponent playlist={sincronizedPlaylist}/>}
    {!isEditionMode && !isEmptyPlaylist && <EditBtn onClick={()=>setIsEditionMode(!isEditionMode)} />}
    {isEditionMode && !isEmptyPlaylist && <BackBtn onClick={()=>setIsEditionMode(!isEditionMode)}/>}
  </>)
}