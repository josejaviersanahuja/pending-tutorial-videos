import { Dispatch } from 'react';
import { IDIOMA } from '../../firebase/lib';
import { IPlayList, IVideos } from '../../interfaces'

type Props = {
  video: IVideos
  playlist: IPlayList
  setSincronizedPlaylist: Dispatch<IPlayList>
  isEditionMode: boolean
}

export default function VideoCards({video, playlist, setSincronizedPlaylist, isEditionMode}: Props) {
  const getIndex = () => {
    return playlist.videos.indexOf(video.vid)
  }
  
  return (
    <div className='videocard'>
      {
        isEditionMode && 
        <>
          {getIndex() !== 0 && <button className='subir'>Up</button>}
          <button className='eliminar'>-</button>
          {getIndex() !== (playlist.videos.length -1) && <button className='bajar'>Down</button>} 
        </>
      }
      <h5>{video.title}</h5>
      <img src={video.imgUrl} alt={video.vid}/>
      <p>{IDIOMA[video.defaultLanguage]}</p>
    </div>
  )
}