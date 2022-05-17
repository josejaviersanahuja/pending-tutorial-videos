import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import PresentationCard from '../../components/PresentationCard'
import { getUsersInList } from '../../firebase/firestore'
import { userConverterFromAny } from '../../firebase/lib'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'

export default function Followers() {

  const {loginUser}=useUser()
  const {state} = useLocation()
  const iuser = userConverterFromAny(state)
  const [fullDataOfFollowers, setFullDataOffFollowers] = useState<IUser[]>([]) 
  
  useEffect(() => {
    iuser.followers.length > 0 && getUsersInList(iuser.followers, setFullDataOffFollowers)
  }, [])
  
  return (
    <div className='followers__page'>
      <Header title='Followers' loginUser={loginUser} />
      <main>
        <p>Followers de {iuser.name}</p>
        <p> {iuser.followers.length}</p>
        {
          fullDataOfFollowers.length > 0 
          && fullDataOfFollowers.map((u,i)=> <PresentationCard key={u.uid} genericUser={u}/>)
        }
      </main>
    </div>
  )
}