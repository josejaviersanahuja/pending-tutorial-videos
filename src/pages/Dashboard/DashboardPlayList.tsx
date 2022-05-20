import React from 'react'
import AddIcon from '../../icons/AddIcon'
import { IUser } from '../../interfaces'
import AddPlayListComponent from './AddPlayListComponent'

type Props = {
  iuser : IUser
}

export default function DashboardPlayList({iuser}: Props) {
  return (<>
    <h4>Listas de reproducción</h4>
    {
      iuser.videoPlayLists.length > 0 
      ? iuser.videoPlayLists.map((e,i)=> <h5 key={i}>ele {i}</h5>)
      : <h5>No hay listas de reproducción. Haga click en el botón de añadir</h5>
    }
    <AddPlayListComponent />
  </>)
}