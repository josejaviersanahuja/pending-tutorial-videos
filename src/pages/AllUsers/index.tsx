import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../firebase/firestore'
import { IUser } from '../../interfaces'

export default function AllUsers() {

    const [allUsers, setAllUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      
        getAllUsers(setAllUsers, setIsLoading)
    
      return () => {
        
      }
    }, [])
    

  return (
    <div>
        <p>AllUsers</p>
        {isLoading && <p>Loading...</p>}
        {allUsers.length > 0 && allUsers.map((u,i)=> <p key={u.uid}>{u.email}</p>)}
    </div>
  )
}