import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { IUser } from '../../interfaces'
import DashboardPlayList from './DashboardPlayList'
import DashboardVideos from './DashboardVideos'

type Props = {
    iuser : IUser
}

export default function DashboardComponent({iuser}: Props) {
  return (
    <Routes>
      <Route index element={<DashboardPlayList iuser = {iuser}/>}/>
      <Route path=':id' element={<DashboardVideos/>}/>
    </Routes>
  )
}