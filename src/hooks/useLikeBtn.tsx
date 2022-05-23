import { useEffect, useState } from 'react'
import { IPlayList, IUser } from '../interfaces'

type Props = {
  playlist: IPlayList | null | undefined,
  iuser: IUser
}

export default function useLikeBtn({playlist, iuser}: Props) {
  
  const [isUserPlayList, setIsUserPlayList] = useState(true)

  useEffect(() => {
    
    if (playlist?.uid === iuser.uid) {
      setIsUserPlayList(true)
    } else {
      setIsUserPlayList(false)
    }
  }, [playlist, iuser])
  
  return {isUserPlayList}
}