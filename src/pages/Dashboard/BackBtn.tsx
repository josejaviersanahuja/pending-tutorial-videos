import React, { MouseEventHandler } from 'react'
import BackIcon from '../../icons/BackIcon'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function BackBtn({onClick}: Props) {
  return (
    <button 
        className='dashboard__video__btn'
        style={{left:"2rem"}}
        onClick={onClick} 
      >
        <BackIcon width={48} height={48} />
    </button>
  )
}