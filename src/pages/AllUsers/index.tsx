import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import PresentationCard from '../../components/PresentationCard'
import { getAllUsers } from '../../firebase/firestore'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'
import SpinnerAllUsers from './SpinnerAllUsers'

export default function AllUsers() {

    const [allUsers, setAllUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const {loginUser} = useUser()

    useEffect(() => {
        getAllUsers(setAllUsers, setIsLoading)
    }, [])
    

  return (
    <div>
      <Header 
        title='Todos los usuarios'
        loginUser={loginUser}
      />
      <main className='main__allusers'>
        <h3>AllUsers</h3>
        {isLoading && <SpinnerAllUsers />}
        {allUsers.length > 0 && allUsers.map((u,i)=> <PresentationCard key={u.uid} genericUser={u}/>)}
      </main>
    </div>
  )
}