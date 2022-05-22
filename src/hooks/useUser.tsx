import { User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { authStateChanged } from '../firebase/auth'
import { gettingUserFromDB } from '../firebase/firestore'
import { EMPTY_IUSER, EMPTY_USER, EMPTY_USER_TYPE, IUser } from '../interfaces'

export default function useUser () {
  const [loginUser, setLoginUser] = useState<User | null | EMPTY_USER_TYPE>(EMPTY_USER)
  const [user, setUser] = useState<IUser | null >(EMPTY_IUSER)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
 
  const twoFunctionsInOne = (loginUser : User | null| EMPTY_USER_TYPE ) => { 
    if (loginUser !== null) {
        setLoginUser(loginUser)
        gettingUserFromDB(loginUser, setUser, setIsAuthLoading)
    } else {
        setLoginUser(null)
        setUser(null)
    }
    setIsAuthLoading(false) 
  }

   useEffect(() => {
        setIsAuthLoading(true)
         authStateChanged(twoFunctionsInOne)
   }, [])


  return { user, loginUser, setUser, isAuthLoading}
}
