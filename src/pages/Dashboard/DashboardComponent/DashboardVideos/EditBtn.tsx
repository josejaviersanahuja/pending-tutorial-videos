import React, { MouseEventHandler } from 'react'
import EditIcon from '../../../../icons/EditIcon'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
  isMetaDataEdition ? : boolean
}

export default function EditBtn({onClick, isMetaDataEdition = false}: Props) {

  const size = isMetaDataEdition ? 30 : 48

  return (
    <button 
        className={isMetaDataEdition ? '':'dashboard__video__btn'}
        style={isMetaDataEdition ? {width:36, height:36, borderRadius:"50%", cursor:"pointer"} : {left:"2rem"}}
        onClick={onClick} 
      >
        <EditIcon width={size} height={size} />
    </button>
  )
}