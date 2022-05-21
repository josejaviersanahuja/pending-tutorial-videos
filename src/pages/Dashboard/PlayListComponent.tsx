import React, { useEffect, useState } from 'react'
import { sincronizePlayList } from '../../firebase/firestore'
import { IPlayList } from '../../interfaces'

type Props = {
  plid : string
}

export default function PlayListComponent({plid}: Props) {

  const [playlist, setPlaylist] = useState<IPlayList| null | undefined>(null)

  useEffect(() => {
    const unsuscribe = sincronizePlayList(plid, setPlaylist)
  
    return () => {
      unsuscribe()
    }
  }, [plid])
  

  return (
    <div className='playlist'>
      PlayListComponent
    </div>
  )
}