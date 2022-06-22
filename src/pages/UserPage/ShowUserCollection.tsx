import React from 'react'
import ListsOfPlaylists from '../../components/ListsOfPlaylists'
import { IUser } from '../../interfaces'

type Props = {
    iuser : IUser
}

export default function ShowUserCollection({iuser}: Props) {
  return (<>
    <h2>Playlists con al menos 1 vídeo</h2>
    <ListsOfPlaylists user={iuser}/>
    </>)
}