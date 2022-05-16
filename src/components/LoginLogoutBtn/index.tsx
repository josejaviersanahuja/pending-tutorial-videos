import { User } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from "../../firebase/auth";

type Props = {
  user: User | null
}

export default function LoginLogoutBtn({ user }: Props) {

  const navigate = useNavigate()

  return (<div className='login__logout__btn'>
    {
      user ? <button onClick={() => { logout() }}>Logout</button>
        : <button onClick={() => { navigate('/login') }}>login</button>
    }
  </div>)
}