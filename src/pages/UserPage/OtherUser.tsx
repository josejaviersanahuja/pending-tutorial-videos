import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { getAnotherUser } from '../../firebase/firestore'
import { IUser } from '../../interfaces'

type Props = {
    id : string | undefined
    loginUser: User | null
}

export default function OtherUser({id, loginUser}: Props) {

    const [otherUser, setOtherUser] = useState<IUser | null | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      if (id === undefined) {
          navigate('/')
      } else {
          getAnotherUser(id, setOtherUser, setIsLoading)
      }
      return () => {
        
      }
    }, [id])
    

  return (
    <div className="home__page">
        <header>
            <Avatar user={loginUser}/>
            <h1>Perfil</h1>
        </header>
        {
        otherUser === undefined ? <p>Loading...</p>
        : <main>
            <h2>Usuario {otherUser?.name}</h2>
            <p>Email {otherUser?.email}</p>
        </main> 
        }
    </div>
  )
}