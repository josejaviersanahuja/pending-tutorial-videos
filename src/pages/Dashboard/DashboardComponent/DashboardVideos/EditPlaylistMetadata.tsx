import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { updatePlayList } from '../../../../firebase/firestore'
import useHandleForm from '../../../../hooks/useHandleForm'
import useUploadFile from '../../../../hooks/useUploadFile'
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
    handleName, 
    handleTexteArea, 
    reset,
    isLoading,
    toggleValue, 
    value
  } = useHandleForm()
  const {imgURL, progress, handleInputFileChange} = useUploadFile(pl.plid)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newplaylist : IPlayList = {
      plid: pl.plid,
      uid: pl.uid,
      name: nameValue === "" ? pl.name : nameValue,
      description: textAreaValue === "" ? pl.description : textAreaValue,
      imgUrl: imgURL === "" ? pl.imgUrl: imgURL,
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
            <label className='dashboard__playlist__input__imagen'>
            <input
              type="file"
              accept='jpg, jpeg, png'
              onChange={handleInputFileChange}
            />
            {progress === 0 ? "Sube una imagen de fondo": `Carga al ${progress}%`}
            </label>
            <input 
              type="submit" 
              value={isLoading ? "Cargando...":"Añadir"} 
              className="dashboard__playlist__input__submit" 
              disabled = {nameValue === "" && textAreaValue === "" && progress!==100}
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