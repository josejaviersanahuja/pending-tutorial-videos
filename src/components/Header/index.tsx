import { User } from 'firebase/auth'
import React from 'react'
import Avatar from '../Avatar'
import LoginLogoutBtn from '../LoginLogoutBtn'

type Props = {
    title: string,
    loginUser: User | null
    isloginpage ? : boolean
}

export default function Header({title, loginUser, isloginpage = false}: Props) {
  return (
    <header>
      <Avatar user={loginUser} />
      <h1>{title}</h1>
      {!isloginpage && <LoginLogoutBtn user={loginUser}/>}
    </header>
  )
}