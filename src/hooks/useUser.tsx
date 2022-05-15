import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { authStateChanged } from '../firebase/auth'
import { gettingUserFromDB } from '../firebase/firestore'
import { IUser } from '../interfaces'

export default function useUser () {
  const [loginUser, setLoginUser] = useState<User | null>(null)
  const [user, setUser] = useState<IUser | null | undefined>(null)
 
  const twoFunctionsInOne = (loginUser : User | null ) => { 
    if (loginUser !== null) {
        setLoginUser(loginUser)
        gettingUserFromDB(loginUser, setUser)
    } else {
        setLoginUser(null)
        setUser(null)
    } 
  }

   useEffect(() => {
         authStateChanged(twoFunctionsInOne)
   }, [])


  return { user, loginUser}
}
