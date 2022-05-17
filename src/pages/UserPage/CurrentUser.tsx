import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { IUser } from '../../interfaces'
import Followers from '../Followers'
import Following from '../Following'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'

type Props = {
  user: IUser | null
}

export default function CurrentUser({ user }: Props) {
  if (user === null) {
    return null
  }
  return (<>
    <main>
      <Routes>
        <Route path='/' element={<FullPresentationCard iuser={user} isCurrentUser />} >
          <Route path='/followers' element={<Followers />} />
          <Route path='/following' element={<Following />} />
        </Route>
      </Routes>

      <ShowUserCollection iuser={user} />
    </main>
  </>)
}