import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { logout } from '../../firebase/auth';
import useUser from '../../hooks/useUser';
import CurrentUser from './CurrentUser';
import OtherUser from './OtherUser';

export default function UserPage() {

    const {user, loginUser} = useUser()
    const {id} = useParams()
    
    useEffect( ()=> {
      if (user===null) {
          logout()
      }
    }, [user])

    if (user !== undefined && id !== user?.uid) {
        return <OtherUser id={id} loginUser={loginUser}/>
    }
    return (
        <div className="home__page">
          {
            user === undefined ? <p>Loading...</p>
            : <>
                <Header
                  title={`Perfil de ${user?.name.substring(0,10)}...`}
                  loginUser={loginUser}
                />
                <CurrentUser user={user} />
              </>
          }
        </div>
      );
}