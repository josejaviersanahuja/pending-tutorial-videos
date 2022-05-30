import React, { SyntheticEvent } from 'react'
import { User } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { EMPTY_USER_TYPE, IUser } from '../../interfaces'

type Props = {
  size?: number
  user: User | null | IUser| EMPTY_USER_TYPE
}

const AVATAR_VACIO = "https://firebasestorage.googleapis.com/v0/b/twitter-clone-d82aa.appspot.com/o/images%2Fdescarga.png?alt=media&token=b422cbfe-2077-48dc-85e2-252272be580f"
const handleError = (e:SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = AVATAR_VACIO
}
export default function Avatar({ size = 48, user }: Props) {
 
  if (!user) {
    return null
  } else {
    return (
      <Link to={`/user/${user.uid}`}>
        <img
          src={user.photoURL || AVATAR_VACIO}
          width={size}
          height={size}
          alt="no imag"
          className='avatar'
          onError={handleError}
        />
      </Link>
    )
  }
}