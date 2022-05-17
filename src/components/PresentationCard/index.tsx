import React from 'react'
import { IUser } from '../../interfaces'
import Avatar from '../Avatar'

type Props = {
	genericUser: IUser
}

export default function PresentationCard({ genericUser }: Props) {
	return (
		<div className='presentation__card'>
			<Avatar user={genericUser}/>
			<p className='presentation__card__name'>{genericUser.name}</p>
			<p className='presentation__card__email'>{genericUser.email}</p>
		</div>
	)
}