import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { logout } from '../../firebase/auth';
import useUser from '../../hooks/useUser';
import { CurrentUserComponent, LoadingComponent, OtherUserComponent } from './ChooseComponent';

export default function UserPage() {

  const { user, loginUser, setUser, isAuthLoading, setIsAuth } = useUser()
  const { id } = useParams()
  const shouldRenderOtherUser = !isAuthLoading && id !== user?.uid
  
  useEffect(() => {
    if (user === null) {
      logout(setIsAuth)
    }
  }, [user, setIsAuth])

  
  
  /* Pueden haber 3 opciones, 
    user undefined : Header sin title, FullPresentationCard Spinner, Colection Spinner
    shouldRenderOtherUser === false : Header con user -> title, FullPrensentationCard sin id, Collection sin id
    shouldRenderOtherUser truthy: Header con otherUser -> title, otherUser -> FullPresentationCard con id, otherUser -> Collection sin id
  */
  //if (!loginUser && user === null) return <Navigate to={`/`} />
  //if (!loginUser || user === null) return null
  
  if (isAuthLoading ) return <LoadingComponent loginUser={loginUser} setIsAuth={setIsAuth}/>
  if (shouldRenderOtherUser || user === null) return <OtherUserComponent 
                                                        currentUser={user} 
                                                        id={id} 
                                                        loginUser={loginUser} 
                                                        setStateAction={setUser} 
                                                        setIsAuth={setIsAuth}
                                                      />
  return <CurrentUserComponent currentUser={user} loginUser={loginUser} setIsAuth={setIsAuth}/>
}
