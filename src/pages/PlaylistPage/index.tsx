import { User } from 'firebase/auth'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { sincronizePlayList } from '../../firebase/firestore'
import { playlistConverterFromAny } from '../../firebase/lib'
import useUser from '../../hooks/useUser'
import { EMPTY_PLAYLIST, EMPTY_USER_TYPE, IPlayList } from '../../interfaces'
import SpinnerDashboard from '../Dashboard/SpinnerDashboard'
import PlaylistPageMain from './PlaylistPageMain'

export default function PlaylistPage() {
  const { id } = useParams()
  const { state } = useLocation()
  
  const pl = playlistConverterFromAny(state)
  const { loginUser, setIsAuth } = useUser()
  
  // con esto vamos a traer de firestore los videos del playlist de la coleccion videos
  if (state === null && id !== undefined) return <PlaylistPageWhenStateIsNull plid={id} loginUser={loginUser} setIsAuth={setIsAuth} />
  return (<>
    <div className='playlistpage'>
      <Header
        loginUser={loginUser}
        title={pl.name.substring(0, 20)}
        setIsAuth={setIsAuth}
      />
      <PlaylistPageMain pl={pl} />
    </div>
  </>)
}

type Props2 = {
  loginUser: User | EMPTY_USER_TYPE | null
  setIsAuth: Dispatch<SetStateAction<boolean>>
  plid: string
}

function PlaylistPageWhenStateIsNull({ loginUser, setIsAuth, plid }: Props2) {

  const [pl, setPlaylist] = useState<IPlayList>(EMPTY_PLAYLIST)

  useEffect(() => {
    const unsuscribe = sincronizePlayList(plid, setPlaylist, undefined)
    
    return () => {
      unsuscribe()
    }
  }, [plid])
  
  if (pl.plid==="") return <SpinnerDashboard loginUser={loginUser} setIsAuth={setIsAuth} />
  return (<>
    <div className='playlistpage'>
      <Header
        loginUser={loginUser}
        title={pl.name.substring(0, 20)}
        setIsAuth={setIsAuth}
      />
      <PlaylistPageMain pl={pl} />
    </div>
  </>)
}