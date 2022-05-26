import React, { MouseEventHandler } from 'react'
import EditIcon from '../../icons/EditIcon'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function EditBtn({onClick}: Props) {
  return (
    <button 
        className='dashboard__video__btn'
        style={{left:"2rem"}}
        onClick={onClick} 
      >
        <EditIcon width={48} height={48} />
    </button>
  )
}