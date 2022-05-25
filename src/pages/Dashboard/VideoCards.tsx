import { Dispatch } from 'react';
import { IDIOMA } from '../../firebase/lib';
import ArrowDown from '../../icons/ArrowDown';
import ArrowUp from '../../icons/ArrowUp';
import DeleteIcon from '../../icons/DeleteIcon';
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
          {getIndex() !== 0 && <button className='subir'><ArrowUp/></button>}
          <button className='eliminar'><DeleteIcon/></button>
          {getIndex() !== (playlist.videos.length -1) && <button className='bajar'><ArrowDown/></button>} 
        </>
      }
      <h4>{video.title}</h4>
      <img src={video.imgUrl} alt={video.vid}/>
      <p>{IDIOMA[video.defaultLanguage]}</p>
    </div>
  )
}