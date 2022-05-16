import React from 'react'
import { User } from 'firebase/auth'
import { Link } from 'react-router-dom'

type Props = {
  size?: number
  user: User | null
}

export default function Avatar({ size = 48, user }: Props) {

  console.log(user?.photoURL);
  
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