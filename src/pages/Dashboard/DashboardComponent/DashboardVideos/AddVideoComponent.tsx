import { FormEvent } from 'react'
import { FetchYoutubeInfo } from '../../../../firebase/lib'
import useHandleForm from '../../../../hooks/useHandleForm'
import VideosIcon from '../../../../icons/VideosIcon'
import { IPlayList } from '../../../../interfaces'

type Props = {
  playlist: IPlayList,
  //setUpdateEffect: Dispatch<SetStateAction<number>>
}
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v="

export default function AddPlayListComponent({ playlist }: Props) {

  const {
    nameValue, 
    name2Value, 
    handleName2, 
    handleName, 
    reset, 
    isLoading,
    setIsLoading,
    value,
    toggleValue
  } = useHandleForm()
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let cod = ""
    // la url o video id deben ser validos
    if (nameValue.length > 32 && nameValue.substring(0,32) === YOUTUBE_BASE_URL ) {
      cod = nameValue.substring(32,43)
      // el video no debe estar repetido ni deben haber más de 10 elementos en el array
      if (playlist.videos.includes(cod) || playlist.videos.length >= 10) {
        playlist.videos.includes(cod) && alert("Ya el video pertenece a este playlist")
        playlist.videos.length >= 10 && alert("No pueden haber más de 10 videos en el playlist")
      } else {
        // FetchYoutubeInfo -> addNewVideoFromDB -> ( updateNewVideo ) & updatePlayList
        // fetch data from youtube
        // check if the video exists in firestore
        // if exists, update it and update playlist
        // if not exists, addNeww and update playlist
        FetchYoutubeInfo(cod, playlist, toggleValue, setIsLoading) 
      }
    } else if (name2Value.length === 11){
      cod = name2Value
      // el video no debe estar repetido ni deben haber más de 10 elementos en el array
      if (playlist.videos.includes(cod) || playlist.videos.length >= 10) {
        playlist.videos.includes(cod) && alert("Ya el video pertenece a este playlist")
        playlist.videos.length >= 10 && alert("No pueden haber más de 10 videos en el playlist")
      } else {
        FetchYoutubeInfo(cod, playlist, toggleValue, setIsLoading) 
      }
    } else {
      alert("El formato introducido no es válido")
      //@TODO info sobre un link valido y/o codigo valido
    }
    reset()
  }
  
  return (
    <>
      {value && <div className="dashboard__video__modal__wrapper">
        <div className="dashboard__video__modal">
          <form onSubmit={handleSubmit}>
            <legend>Agrega un Video</legend>
            <input
              type="text"
              placeholder="link de youtube"
              onChange={handleName}
              value={nameValue}
              className="dashboard__video__input__name"
              disabled={!!name2Value}
            />
            <input
              type="text"
              placeholder="Código del vídeo"
              onChange={handleName2}
              value={name2Value}
              className="dashboard__video__input__name"
              disabled={!!nameValue}
            />
            <input type="submit" value={isLoading ? "Cargando...":"Añadir"} className="dashboard__video__input__submit" disabled={isLoading}/>
            <button onClick={() => { toggleValue(true) }} disabled={isLoading}>{isLoading ? "Cargando...":"Cerrar"}</button>
          </form>
        </div>
      </div>
      }
      <button 
        className='dashboard__video__btn' 
        onClick={() => { toggleValue(false) }} 
      >
        <VideosIcon width={48} height={48} />
      </button>
    </>
  )
}