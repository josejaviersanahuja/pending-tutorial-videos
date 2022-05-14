import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStateChanged } from '../firebase/auth'
import { ILoginUser, IUser } from '../interfaces'

export default function useUser () {
  const [loginUser, setLoginUser] = useState<ILoginUser | null | undefined>(null)
  const [user, setUser] = useState<IUser | null | undefined>(null)
  const navigate = useNavigate()

  const twoFunctionsInOne = (loginUser : User | null | undefined ) => { 
    if (loginUser !== null && loginUser !== undefined) {
        const {displayName, email, photoURL, refreshToken,metadata, uid } = loginUser
        const luser : ILoginUser = {name : displayName, email, photoURL, uid}
        setLoginUser(luser)
    } else if (loginUser === null) {
        setLoginUser(null)
        setUser(null)
    } else {
        setLoginUser(undefined)
        setUser(undefined)
    }
  }

   useEffect(() => {
         authStateChanged(twoFunctionsInOne)
   }, [])


  useEffect(() => {
    console.log('2 ', loginUser);
    
    if(!loginUser) navigate('/login')
  }, [loginUser])

  return { user, loginUser}
}
