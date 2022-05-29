import React, { Dispatch, SetStateAction } from 'react'
import ListsOfPlaylists from '../../components/ListsOfPlaylists'
import { IUser } from '../../interfaces'
import FullPresentationCard from './FullPresentationCard'
import SpinnerFullPresentationCard from './SpinnerFullPresentationCard'

type Props = {
	otherUser : IUser | null
	currentUser : IUser | null
	setStateAction : Dispatch<SetStateAction<IUser|null>>
}

export default function OtherUser({ otherUser, currentUser, setStateAction }: Props) {

	if (otherUser === null) return <p>otherUser null en OtherUser Component</p> // esto solo ayuda a typescrit a leer otherUser truthy
	return (
		<>
			{
				otherUser === undefined ? <SpinnerFullPresentationCard/>
					: <>
						{otherUser && <FullPresentationCard iuser={otherUser} isCurrentUser={false} currentUser = {currentUser} setStateAction={setStateAction}/>}
						<ListsOfPlaylists user={otherUser} currentUser={currentUser}/>
					</>
			}
		</>
	)
}