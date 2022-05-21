import React, { Dispatch, SetStateAction } from 'react'
import { IUser } from '../../interfaces'
import AddPlayListComponent from './AddPlayListComponent'
import PlayListComponent from './PlayListComponent'

type Props = {
  iuser : IUser
  setUser : Dispatch<SetStateAction<IUser| null | undefined>>
}

export default function DashboardPlayList({iuser, setUser}: Props) {

  // Quiero hacer sincronizacion en tiempo real con la coleccion playlist

  return (<>
    <h4>Listas de reproducción</h4>
    {
      iuser.videoPlayLists.length > 0 
      ? iuser.videoPlayLists.map((e,i)=> <PlayListComponent key={i} plid={e}/>)
      : <h5>No hay listas de reproducción. Haga click en el botón de añadir</h5>
    }
    <AddPlayListComponent iuser={iuser} setUser={setUser}/>
  </>)
}