import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { logout } from '../../firebase/auth';
import useUser from '../../hooks/useUser';
import CurrentUser from './CurrentUser';
import OtherUser from './OtherUser';

export default function UserPage() {

    const {user, loginUser} = useUser()
    const {id} = useParams()
    
  // @TODO debemos sacar por params del rectrouterdom el id y hacer un getDoc a firebase
    useEffect( ()=> {
      if (user===null) {
          logout()
            .then( ()=>{
              alert("Error al conectar con la base de datos. Disculpe las molestias")
            })
      }
    }, [user])

    if (user !== undefined && id !== user?.uid) {
        return <OtherUser id={id} loginUser={loginUser}/>
    }
    return (
        <div className="home__page">
          <header>
            <Avatar user={loginUser}/>
            <h1>Perfil</h1>
          </header>
          {
            user === undefined ? <p>Loading...</p>
            : <CurrentUser user={user} />
          }
        </div>
      );
}