import { User } from 'firebase/auth'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { IUser } from '../../interfaces'
import Followers from '../Followers'
import Following from '../Following'
import { LoadingComponent } from './ChooseComponent'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'

type Props = {
  user: IUser | null
  loginUser : User | null
}

export default function CurrentUser({ user, loginUser }: Props) {
  if (user === null)  return null
  if (user === undefined) return <LoadingComponent loginUser={loginUser}/>
  return (<>
      <FullPresentationCard iuser={user} isCurrentUser currentUser={user}/>
      <ShowUserCollection iuser={user} />
  </>)
}