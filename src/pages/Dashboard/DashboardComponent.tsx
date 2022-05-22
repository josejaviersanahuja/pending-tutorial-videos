import React, { Dispatch, SetStateAction } from 'react'
import { Route, Routes } from 'react-router-dom'
import { IUser } from '../../interfaces'
import DashboardPlayList from './DashboardPlayList'
import DashboardVideos from './DashboardVideos'

type Props = {
    iuser : IUser
    setUser: Dispatch<SetStateAction<IUser | null>>
}

export default function DashboardComponent({iuser, setUser}: Props) {
  return (
    <Routes>
      <Route index element={<DashboardPlayList iuser = {iuser} setUser={setUser} />}/>
      <Route path=':id' element={<DashboardVideos/>}/>
    </Routes>
  )
}