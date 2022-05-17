import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import useUser from '../../hooks/useUser'

export default function Followers() {

  const {id} = useParams()
  const {loginUser} = useUser()

  return (
    <div className='followers__page'>
      <Header title='Followers' loginUser={loginUser} />
      <main>
        Followers de id: {id}
      </main>
    </div>
  )
}