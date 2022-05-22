import { User } from 'firebase/auth';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from "../../firebase/auth";
import { EMPTY_USER_TYPE } from '../../interfaces';

type Props = {
  user: User | null| EMPTY_USER_TYPE
}

export default function LoginLogoutBtn({ user }: Props) {

  const navigate = useNavigate()
  const location = useLocation()

  return (<div className='login__logout__btn'>
    {
      user ? <button onClick={() => { logout() }}>Logout</button>
        : <button onClick={() => { navigate('/login', {state:location.pathname}) }}>login</button>
    }
  </div>)
}