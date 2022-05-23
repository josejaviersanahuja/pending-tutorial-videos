import { User } from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import Header from '../../components/Header'
import useOtherUser from '../../hooks/useOtherUser'
import { EMPTY_USER_TYPE, IUser } from '../../interfaces'
import CurrentUser from './CurrentUser'
import OtherUser from './OtherUser'
import SpinnerFullPresentationCard from './SpinnerFullPresentationCard'

/**
 * Esto tres componentes van a añadir el Layout con Headers distintos
 */

/**
 * La lógica de OtherUser es muy importante porque salen de firestore
 * Además debemos implementar la lógica del follow unfollow button
 * Que va a modificar la base de datos y además el estado user
 */
interface IOtherUserComponent {
  id : string | undefined,
  loginUser : User | null | EMPTY_USER_TYPE
  currentUser : IUser | null
  setStateAction : Dispatch<SetStateAction<IUser|null>>
  setIsAuth : Dispatch<SetStateAction<boolean>>
}
export const OtherUserComponent = ({id, currentUser, setStateAction, loginUser, setIsAuth} : IOtherUserComponent) => {
  const {otherUser} = useOtherUser(id)
  return <div className='user__page'>
    <Header
        title={`Perfil de ${otherUser?.name.substring(0, 10)}...`}
        loginUser={loginUser}
        setIsAuth={setIsAuth}
    />
    <main>
      <OtherUser otherUser={otherUser} currentUser={currentUser} setStateAction={setStateAction}/>
    </main>
  </div>
}

/**
 * La lógica de estos componentes no es muy importante porque salen de los estados user loginUser
 * No hay fetch ni setStateActions
 */

interface ICurrentUserComponent {
  loginUser : User | null| EMPTY_USER_TYPE
  currentUser : IUser
  setIsAuth : Dispatch<SetStateAction<boolean>>
}
export const CurrentUserComponent = ({currentUser, loginUser, setIsAuth} : ICurrentUserComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ${currentUser.name.substring(0, 10)}...`}
        loginUser={loginUser}
        setIsAuth={setIsAuth}
    />
    <main>
      <CurrentUser user={currentUser} loginUser={loginUser}/>
    </main>
  </div>
}

interface ILoadingComponent {
  loginUser: User | null| EMPTY_USER_TYPE
  setIsAuth : Dispatch<SetStateAction<boolean>>
}
export const LoadingComponent =({loginUser, setIsAuth}:ILoadingComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ...`}
        loginUser={loginUser}
        setIsAuth={setIsAuth}
    />
    <main>
      <SpinnerFullPresentationCard />
    </main>
  </div>
}
