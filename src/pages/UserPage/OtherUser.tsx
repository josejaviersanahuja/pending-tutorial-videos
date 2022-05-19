import React, { Dispatch, SetStateAction } from 'react'
import { IUser } from '../../interfaces'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'
import SpinnerFullPresentationCard from './SpinnerFullPresentationCard'

type Props = {
	otherUser : IUser | null | undefined
	currentUser : IUser | null
	setStateAction : Dispatch<SetStateAction<IUser|null|undefined>>
}

export default function OtherUser({ otherUser, currentUser, setStateAction }: Props) {

	if (otherUser === null) return <p>otherUser null en OtherUser Component</p> // esto solo ayuda a typescrit a leer otherUser truthy
	return (
		<>
			{
				otherUser === undefined ? <SpinnerFullPresentationCard/>
					: <>
						{otherUser && <FullPresentationCard iuser={otherUser} isCurrentUser={false} currentUser = {currentUser} setStateAction={setStateAction}/>}
						<ShowUserCollection iuser={otherUser} />
					</>
			}
		</>
	)
}