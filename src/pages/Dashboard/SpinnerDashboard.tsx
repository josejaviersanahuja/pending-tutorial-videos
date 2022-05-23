import { User } from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import Header from '../../components/Header'
import { EMPTY_USER_TYPE } from '../../interfaces'

type Props = {
  loginUser: User | EMPTY_USER_TYPE | null
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

export default function SpinnerDashboard({ loginUser, setIsAuth }: Props) {
  return (
    <div className='dashboard__page'>
      <Header title="Dashboard" loginUser={loginUser} setIsAuth={setIsAuth}/>
      <main className='main__dashboard'>
        <h4>Listas de reproducción</h4>
        <div className='playlistcard__wrapper'>
          <div className='playlistcard'>
            <h3 className='spinner'>.</h3>
            <p className='spinner'>.</p>
            <div className='playlistcard__footer spinner'>
              <button>.</button>
              <button>.</button>
            </div>
          </div>
          <div className='playlistcard'>
            <h3 className='spinner'>.</h3>
            <p className='spinner'>.</p>
            <div className='playlistcard__footer spinner'>
              <button>.</button>
              <button>.</button>
            </div>
          </div>
          <div className='playlistcard'>
            <h3 className='spinner'>.</h3>
            <p className='spinner'>.</p>
            <div className='playlistcard__footer spinner'>
              <button>.</button>
              <button>.</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}