import React, { useEffect, useState } from 'react'
import { getUser } from '../../firebase/firestore'
import { EMPTY_IUSER, IUser } from '../../interfaces'
import Avatar from '../Avatar'
import SpinnerAvatar from '../Avatar/SpinnerAvatar'

type Props = {
  uid: string
}

export default function FetchedAvatar({uid}: Props) {

  const [user, setuser] = useState<IUser|null>(EMPTY_IUSER)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUser(uid, setuser, setIsLoading)
  }, [])
  
  if (isLoading) return <SpinnerAvatar size={36} />
  return (
    <Avatar user={user} size={36} />
  )
}