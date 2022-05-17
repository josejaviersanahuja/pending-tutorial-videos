import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getAnotherUser } from '../../firebase/firestore'
import { IUser } from '../../interfaces'
import Followers from '../Followers'
import Following from '../Following'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'

type Props = {
	id: string | undefined
}

export default function OtherUser({ id }: Props) {

	const [otherUser, setOtherUser] = useState<IUser | null | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		if (id === undefined) {
			navigate('/')
		} else {
			getAnotherUser(id, setOtherUser, navigate)
		}
	}, [id, navigate])

	if (otherUser === null) return null
	return (
		<>
			{
				otherUser === undefined ? <p>Loading...</p>
					: <main>
						{otherUser && <FullPresentationCard iuser={otherUser} isCurrentUser={false} />}
						<ShowUserCollection iuser={otherUser} />
					</main>
			}
		</>
	)
}