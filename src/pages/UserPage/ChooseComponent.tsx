import { User } from 'firebase/auth'
import React from 'react'
import Header from '../../components/Header'
import { IUser } from '../../interfaces'
import CurrentUser from './CurrentUser'
import OtherUser from './OtherUser'

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
  loginUser : User
  currentUser : IUser 
  setStateAction : () => void
}
export const OtherUserComponent = ({id, currentUser, setStateAction, loginUser} : IOtherUserComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ${currentUser.name.substring(0, 10)}...`}
        loginUser={loginUser}
    />
    <main>
      <OtherUser id={id} currentUser={currentUser} setStateAction={setStateAction}/>
    </main>
  </div>
}

/**
 * La lógica de estos componentes no es muy importante porque salen de los estados user loginUser
 * No hay fetch ni setStateActions
 */

interface ICurrentUserComponent {
  loginUser : User
  currentUser : IUser
}
export const CurrentUserComponent = ({currentUser, loginUser} : ICurrentUserComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ${currentUser.name.substring(0, 10)}...`}
        loginUser={loginUser}
    />
    <main>
      <CurrentUser user={currentUser}/>
    </main>
  </div>
}

interface ILoadingComponent {
  loginUser: User
}
export const LoadingComponent =({loginUser}:ILoadingComponent) => {
  return <div className='user__page'>
    <Header
        title={`Perfil de ...`}
        loginUser={loginUser}
    />
    <main>Loading...</main>
  </div>
}
