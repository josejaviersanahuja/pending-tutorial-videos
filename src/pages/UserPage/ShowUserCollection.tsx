import React from 'react'
import { IUser } from '../../interfaces'

type Props = {
    iuser : IUser
}

export default function ShowUserCollection({iuser}: Props) {
  return (
    <h2>ShowUserCollection, {iuser.videoPlayLists.length}</h2>
  )
}