import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import useUser from '../../hooks/useUser'

export default function Following() {

  const {id} = useParams()
  const {loginUser} = useUser()

  return (
    <div className='following__page'>
      <Header title='Following' loginUser={loginUser} />
      <main>
        Following de id: {id}
      </main>
    </div>
  )
}