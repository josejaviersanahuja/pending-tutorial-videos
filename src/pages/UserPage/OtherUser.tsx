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
	currentUser : IUser
	setStateAction : () => void
}

export default function OtherUser({ id, currentUser, setStateAction }: Props) {

	const [otherUser, setOtherUser] = useState<IUser | null | undefined>(undefined)
	const navigate = useNavigate()

	/** useEffect va a buscar el usuario con uid= id en firestore
	 * si id es undefined, redirige a la home, no tiene sentido renderizar un usuario vacio
	 * 		Luego. obtnemos otherUser que es el perfil del usuario id. 
	 * 				otherUser = undefined sirve para mostrar spinner
	 * 				otherUser = null ayuda a redirigir a notfound404 por error de get user e firestore
	 */
	useEffect(() => {
		if (id === undefined) {
			navigate('/')
		} else {
			getAnotherUser(id, setOtherUser, navigate)
		}
	}, [id, navigate])

	if (otherUser === null) return null // esto solo ayuda a typescrit a leer otherUser truthy
	return (
		<>
			{
				otherUser === undefined ? <p>Loading...</p>
					: <>
						{otherUser && <FullPresentationCard iuser={otherUser} isCurrentUser={false} currentUser = {currentUser} />}
						<ShowUserCollection iuser={otherUser} />
					</>
			}
		</>
	)
}