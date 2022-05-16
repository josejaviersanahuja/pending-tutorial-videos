import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { getAllUsers } from '../../firebase/firestore'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'

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
      <main>
        <p>AllUsers</p>
        {isLoading && <p>Loading...</p>}
        {allUsers.length > 0 && allUsers.map((u,i)=> <p key={u.uid}>{u.email}</p>)}
      </main>
    </div>
  )
}