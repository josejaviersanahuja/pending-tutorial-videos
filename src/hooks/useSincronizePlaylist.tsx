import React, { Dispatch, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sincronizePlayList } from '../firebase/firestore'
import { EMPTY_PLAYLIST, IPlayList, IVideos } from '../interfaces'

type Props = {
  plid: string,
  initialPlaylist ?: IPlayList // se usa en DashboardVideos
  setallVideos ? : Dispatch<IVideos[]> | undefined // undefined en  DashboardPlaylist
}

// hook que sirve para sincronizar el playlist. 
// Si estamos en dashboard, muestra muchos playlist
// Si estamos en bashboardvideos, muestra los videos del playlist seleccionado. Aquí se hace una búsqueda más profunda para sincronizar allVideos
export default function useSincronizePlaylist({plid, initialPlaylist = EMPTY_PLAYLIST, setallVideos = undefined}: Props) {

  const [playlist, setPlaylist] = useState<IPlayList>(initialPlaylist)
  const navigate = useNavigate()
  
  useEffect(() => {
    // para distinguir ambos usos revisar este método
    const unsuscribe = sincronizePlayList(plid, setPlaylist, setallVideos)
    return () => {
      unsuscribe()
    }
  }, [plid])

  const handleClick = () => {
    navigate(`${plid}`, {state:playlist})
  }

  return {playlist, handleClick, setSincronizedPlaylist: setPlaylist}
}