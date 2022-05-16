import React from 'react'
import { IUser } from '../../interfaces'

type Props = {
    user : IUser | null
}

export default function CurrentUser({user}: Props) {
  return (
    <main>
        <h2>Usuario {user?.name}</h2>
        <p>Email {user?.email}</p>
    </main> 
  )
}