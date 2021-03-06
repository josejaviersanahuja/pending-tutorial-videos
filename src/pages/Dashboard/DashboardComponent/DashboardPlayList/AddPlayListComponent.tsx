import { Dispatch, FormEvent, SetStateAction } from 'react'
import { addNewPlayList } from '../../../../firebase/firestore'
import useHandleForm from '../../../../hooks/useHandleForm'
import AddIcon from '../../../../icons/AddIcon'
import { IPlayList, IUser } from '../../../../interfaces'

type Props = {
  iuser: IUser,
  setUser: Dispatch<SetStateAction<IUser|null>>
}

export default function AddPlayListComponent({ iuser, setUser }: Props) {

  const {
    nameValue, 
    textAreaValue, 
    name2Value, 
    handleName2, 
    handleName, 
    handleTexteArea, 
    reset,
    isLoading,
    setIsLoading,
    toggleValue, 
    value
  } = useHandleForm()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newplaylist : IPlayList = {
      plid: "",
      uid: iuser.uid,
      name: nameValue,
      description: textAreaValue,
      imgUrl: "",
      likes:[],
      videos:[],
      numLikes:0
    }
    setIsLoading(true)
    if (iuser.videoPlayLists.length < 10) {
      addNewPlayList(newplaylist, toggleValue, setUser, iuser)
      .then(()=>setIsLoading(false))
      .catch(()=>setIsLoading(false))  
    } else {
      alert("Solo puedes tener un máximo de 10 playlist")
    }
    
    reset()
  }

  return (
    <>
      {value && <div className="dashboard__playlist__modal__wrapper">
        <div className="dashboard__playlist__modal">
          <form onSubmit={handleSubmit}>
            <legend>Agrega una nueva playlist</legend>
            <input
              type="text"
              placeholder="nombre del playlist"
              onChange={handleName}
              value={nameValue}
              className="dashboard__playlist__input__name"
            />
            <textarea
              placeholder="descripción"
              maxLength={150}
              onChange={handleTexteArea}
              value={textAreaValue}
              className="dashboard__playlist__input__descripcion"
            />
            <input
              type="file"
              placeholder="imagen"
              onChange={handleName2}
              value={name2Value}
              className="dashboard__playlist__input__imagen"
            />
            <input type="submit" value={isLoading ? "Cargando...":"Añadir"} className="dashboard__playlist__input__submit" />
            <button onClick={() => { toggleValue(true) }}>{isLoading ? "Cargando...":"Cerrar"}</button>
          </form>
        </div>
      </div>
      }
      <button className='dashboard__playlist__btn' onClick={() => { toggleValue(false) }} ><AddIcon /></button>
    </>
  )
}