import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePlayList } from '../../../../firebase/firestore'
import useHandleForm from '../../../../hooks/useHandleForm'
import { IPlayList } from '../../../../interfaces'
import EditBtn from './EditBtn'

type Props = {
  pl: IPlayList
}

export default function EditPlaylistMetadata({pl}: Props) {

  const navigate = useNavigate()
  const {
    nameValue, 
    textAreaValue, 
    name2Value, 
    handleName2, 
    handleName, 
    handleTexteArea, 
    reset,
    isLoading,
    toggleValue, 
    value
  } = useHandleForm()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newplaylist : IPlayList = {
      plid: pl.plid,
      uid: pl.uid,
      name: nameValue,
      description: textAreaValue,
      imgUrl: pl.imgUrl,
      likes:pl.likes,
      videos:pl.videos,
      numLikes:pl.numLikes
    }
    updatePlayList(newplaylist)
    .then(()=>{
      navigate("/dashboard")
    })
    reset()
  }

  return (
    <>
      {value && <div className="dashboard__playlist__modal__wrapper">
        <div className="dashboard__playlist__modal">
          <form onSubmit={handleSubmit}>
            <legend>Edita el nombre y la descripción del playlist</legend>
            <input
              type="text"
              placeholder={pl.name}
              onChange={handleName}
              value={nameValue}
              className="dashboard__playlist__input__name"
            />
            <textarea
              placeholder={pl.description}
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
            <input 
              type="submit" 
              value={isLoading ? "Cargando...":"Añadir"} 
              className="dashboard__playlist__input__submit" 
              disabled = {nameValue === "" || textAreaValue === ""}
            />
            <button onClick={() => { toggleValue(true) }}>{isLoading ? "Cargando...":"Cerrar"}</button>
          </form>
        </div>
      </div>
      }
      <EditBtn onClick={()=>{toggleValue(false)}} isMetaDataEdition/>
    </>
  )
}