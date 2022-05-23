import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import PresentationCard from '../../components/PresentationCard'
import { getUsersInList } from '../../firebase/firestore'
import { userConverterFromAny } from '../../firebase/lib'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'

export default function Following() {

  const {loginUser, setIsAuth}=useUser()
  const {state } = useLocation()
  const iuser = userConverterFromAny(state)
  const [fullDataOfFollowing, setFullDataOffFollowing] = useState<IUser[]>([]) 
  
  useEffect(() => {
    iuser.following.length > 0 && getUsersInList(iuser.following, setFullDataOffFollowing)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div className='following__page'>
      <Header 
        title='Following' 
        loginUser={loginUser} 
        setIsAuth={setIsAuth}
      />
      <main className='main__allusers'>
        <h4>Following {iuser.name}</h4>
        {
          fullDataOfFollowing.length > 0 
          && fullDataOfFollowing.map((u,i)=> <PresentationCard key={u.uid} genericUser={u}/>)
        }
      </main>
    </div>
  )
}