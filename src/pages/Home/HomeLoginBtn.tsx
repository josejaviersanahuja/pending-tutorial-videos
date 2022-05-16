import { User } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from "../../firebase/auth";

type Props = {
   user: User | null
}

export default function HomeLoginBtn({user}: Props) {

    const navigate = useNavigate()
    // @TODO eliminar funcion logout y convertirla en el toggle menu
  return (<div className='home__login__or__menu__btn'>
    {
        user ? <button onClick={()=>{logout()}}>menu</button>
                :   <button onClick={()=>{navigate('/login')}}>login</button>
    }
  </div>)
}