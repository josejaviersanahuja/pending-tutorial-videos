import { User } from 'firebase/auth'
import React from 'react'
import Avatar from '../Avatar'
import LoginLogoutBtn from '../LoginLogoutBtn'

type Props = {
    title: string,
    loginUser: User | null
}

export default function Header({title, loginUser}: Props) {
  return (
    <header>
      <Avatar user={loginUser} />
      <h1>{title}</h1>
      <LoginLogoutBtn user={loginUser}/>
    </header>
  )
}