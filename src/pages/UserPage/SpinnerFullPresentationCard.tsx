import React from 'react'
import SpinnerAvatar from '../../components/Avatar/SpinnerAvatar'

export default function SpinnerFullPresentationCard() {
  return (
    <div className='full__presentation__card'>
			<SpinnerAvatar size={90}/>
			<p className='full__presentation__card__name spinner'>.</p>
			<p className='full__presentation__card__email spinner'>.</p>
	</div>

  )
}