import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getAnotherUser } from '../../firebase/firestore'
import useOtherUser from '../../hooks/useOtherUser'
import { IUser } from '../../interfaces'
import Followers from '../Followers'
import Following from '../Following'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'

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
				otherUser === undefined ? <p>Loading...</p>
					: <>
						{otherUser && <FullPresentationCard iuser={otherUser} isCurrentUser={false} currentUser = {currentUser} setStateAction={setStateAction}/>}
						<ShowUserCollection iuser={otherUser} />
					</>
			}
		</>
	)
}