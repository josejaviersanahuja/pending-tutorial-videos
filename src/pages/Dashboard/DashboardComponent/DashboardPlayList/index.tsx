import React, { Dispatch, SetStateAction } from 'react'
import { IUser } from '../../../../interfaces'
import AddPlayListComponent from './AddPlayListComponent'
import PlayListComponent from './PlayListComponent'

type Props = {
  iuser : IUser
  setUser : Dispatch<SetStateAction<IUser| null>>
}

const isEmptyPlaylist = (iuser :IUser) => {
  return iuser.videoPlayLists.length === 0 
}

export default function DashboardPlayList({iuser, setUser}: Props) {

  return (<>
    <h4>Listas de reproducción</h4>
    <div className='playlistcard__wrapper'>
    {
      !isEmptyPlaylist(iuser) 
      ? iuser.videoPlayLists.map((e,i)=> <PlayListComponent key={i} plid={e}/>)
      : <h5>No hay listas de reproducción. Haga click en el botón de añadir</h5>
    }
    </div>
    <AddPlayListComponent iuser={iuser} setUser={setUser}/>
  </>)
}