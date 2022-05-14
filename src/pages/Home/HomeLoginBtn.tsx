import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from "../../firebase/auth";
import useUser from '../../hooks/useUser';

type Props = {}

export default function HomeLoginBtn({}: Props) {

    const {loginUser} = useUser()
    const navigate = useNavigate()
    // @TODO eliminar funcion logout y convertirla en el toggle menu
  return (<div className='home__login__or__menu__btn'>
    {
        loginUser ? <button onClick={()=>{logout()}}>menu</button>
                :   <button onClick={()=>{navigate('/login')}}>login</button>
    }
  </div>)
}