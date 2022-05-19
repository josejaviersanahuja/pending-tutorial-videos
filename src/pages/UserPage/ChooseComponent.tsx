import { User } from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import Header from '../../components/Header'
import useOtherUser from '../../hooks/useOtherUser'
import { IUser } from '../../interfaces'
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
  loginUser : User | null
  currentUser : IUser | null
  setStateAction : Dispatch<SetStateAction<IUser|null|undefined>>
}
export const OtherUserComponent = ({id, currentUser, setStateAction, loginUser} : IOtherUserComponent) => {
  const {otherUser} = useOtherUser(id)
  return <div className='user__page'>
    <Header
        title={`Perfil de ${otherUser?.name.substring(0, 10)}...`}
        loginUser={loginUser}
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
  loginUser : User | null
  currentUser : IUser
}
export const CurrentUserComponent = ({currentUser, loginUser} : ICurrentUserComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ${currentUser.name.substring(0, 10)}...`}
        loginUser={loginUser}
    />
    <main>
      <CurrentUser user={currentUser} loginUser={loginUser}/>
    </main>
  </div>
}

interface ILoadingComponent {
  loginUser: User | null
}
export const LoadingComponent =({loginUser}:ILoadingComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ...`}
        loginUser={loginUser}
    />
    <main>
      <SpinnerFullPresentationCard />
    </main>
  </div>
}
