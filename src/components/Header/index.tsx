import { User } from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import { EMPTY_USER_TYPE } from '../../interfaces'
import Avatar from '../Avatar'
import LoginLogoutBtn from '../LoginLogoutBtn'

type Props = {
    title: string,
    loginUser: User | null| EMPTY_USER_TYPE
    isloginpage ? : boolean
    setIsAuth: Dispatch<SetStateAction<boolean>>
}

export default function Header({title, loginUser, isloginpage = false, setIsAuth}: Props) {
  return (
    <header>
      <Avatar user={loginUser} />
      <h1>{title}</h1>
      {!isloginpage && <LoginLogoutBtn user={loginUser} setIsAuth={setIsAuth}/>}
    </header>
  )
}