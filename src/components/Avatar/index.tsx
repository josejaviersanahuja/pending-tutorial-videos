import React from 'react'
import { User } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { IUser } from '../../interfaces'

type Props = {
  size?: number
  user: User | null | IUser
}

export default function Avatar({ size = 48, user }: Props) {
 
  if (!user) {
    return null
  } else {
    return (
      <Link to={`/user/${user.uid}`}>
        <img
          src={user.photoURL || "no image"}
          width={size}
          height={size}
          alt="no imag"
          className='avatar'
        />
      </Link>
    )
  }
}