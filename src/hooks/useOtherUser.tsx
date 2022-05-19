import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAnotherUser } from "../firebase/firestore"
import { IUser } from "../interfaces"

export default function useOtherUser(id : string | undefined) {
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
  
  return {otherUser}
}