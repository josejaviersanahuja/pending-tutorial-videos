import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { getAnotherUser } from '../../firebase/firestore'
import { IUser } from '../../interfaces'

type Props = {
	id: string | undefined
	loginUser: User | null
}

export default function OtherUser({ id, loginUser }: Props) {

	const [otherUser, setOtherUser] = useState<IUser | null | undefined>(undefined)
	const navigate = useNavigate()

	useEffect(() => {
		if (id === undefined) {
			navigate('/')
		} else {
			getAnotherUser(id, setOtherUser, navigate)
		}
		return () => {

		}
	}, [id, navigate])


	return (
		<div className="home__page">
			<Header
				title={`Perfil de ${otherUser?.name}`}
				loginUser={loginUser}
			/>
			{
				otherUser === undefined ? <p>Loading...</p>
					: <main>
						<h2>Usuario {otherUser?.name}</h2>
						<p>Email {otherUser?.email}</p>
					</main>
			}
		</div>
	)
}