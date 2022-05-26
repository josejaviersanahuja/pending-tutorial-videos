import React, { Dispatch, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deletePlayList, sincronizePlayList } from '../../firebase/firestore'
import { playlistConverterFromAny } from '../../firebase/lib'
import { EMPTY_PLAYLIST, IPlayList, IUser, IVideos } from '../../interfaces'
import AddVideoComponent from './AddVideoComponent'
import BackBtn from './BackBtn'
import EditBtn from './EditBtn'
import VideoCards from './VideoCards'

type Props = {
  setUser : Dispatch<IUser|null>
}

export default function DashboardVideos({setUser}:Props) {

  const {state} = useLocation()
  const navigate = useNavigate()
  const playlist = typeof state == 'object' ? playlistConverterFromAny(state) : EMPTY_PLAYLIST
  const [sincronizedPlaylist, setSincronizedPlaylist] = useState<IPlayList>(playlist)
  const [allVideos, setallVideos] = useState<IVideos[]>([])
  const [isEditionMode, setIsEditionMode] = useState(false)
  const isEmptyPlaylist = sincronizedPlaylist.videos.length === 0
  useEffect(() => {
    const unsuscribePlayList = sincronizePlayList(playlist.plid, setSincronizedPlaylist, setallVideos)
    if (isEmptyPlaylist) {
      setIsEditionMode(false)
    }
    return () => {
      unsuscribePlayList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setallVideos, setSincronizedPlaylist])

  const handleDeletePlaylist = ()=>{
    deletePlayList(playlist, setUser)
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
    {/*isEditionMode && !isEmptyPlaylist && <SaveBtn onClick={()=>setIsEditionMode(!isEditionMode)}/>*/}
  </>)
}