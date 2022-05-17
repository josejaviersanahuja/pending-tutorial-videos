import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { logout } from '../../firebase/auth';
import useUser from '../../hooks/useUser';
import { IUser } from '../../interfaces';
import CurrentUser from './CurrentUser';
import OtherUser from './OtherUser';

export default function UserPage() {

  const { user, loginUser } = useUser()
  const { id } = useParams()
  const shouldRenderOtherUser = user !== undefined && id !== user?.uid
  useEffect(() => {
    if (user === null) {
      logout()
    }
  }, [user])

  return (
    <div className="user__page">
      <Header
        title={`Perfil de ${user?.name.substring(0, 10)}...`}
        loginUser={loginUser}
      />
      {
        ChoosingWichComponentToRender(user, shouldRenderOtherUser, id)
      }
      {/* @TODO Componente con colecciones */}
    </div>
  );
}

const ChoosingWichComponentToRender = (iuser : IUser | null | undefined, shouldRenderOtherUser:boolean, id: string | undefined) => {
  if (iuser === undefined) return <p>Loading...</p>
  
  if (shouldRenderOtherUser) return <OtherUser id={id} />

  return <CurrentUser user={iuser}/>
}