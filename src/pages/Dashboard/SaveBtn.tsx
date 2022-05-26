import React, { MouseEventHandler } from 'react'
import SaveIcon from '../../icons/SaveIcon'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function SaveBtn({onClick}: Props) {
  return (
    <button 
        className='dashboard__video__btn'
        style={{right:"2rem"}}
        onClick={onClick} 
      >
        <SaveIcon width={48} height={48} />
    </button>
  )
}