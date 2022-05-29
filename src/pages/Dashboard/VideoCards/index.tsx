import { Dispatch, useState } from 'react';
import { IDIOMA } from '../../../firebase/lib';
import { IPlayList, IVideos } from '../../../interfaces'
import BotonosEnVideoCards from './BotonosEnVideoCards';

type Props = {
  video: IVideos
  playlist: IPlayList
  setSincronizedPlaylist: Dispatch<IPlayList>
  isEditionMode: boolean
}

export default function VideoCards({video, playlist, setSincronizedPlaylist, isEditionMode}: Props) {
  
  const [isDeletingVideo, setIsDeletingVideo] = useState(false)

  if (isDeletingVideo) return (
    <div className='videocard spinner'>
      <h4>.</h4>
      <img src={""} alt={"."} width={320} height={120}/>
      <p>.</p>
    </div>
  )
  
  return (
    <div className='videocard'>
      {
        isEditionMode && 
        <BotonosEnVideoCards 
          setIsDeletingVideo={setIsDeletingVideo} 
          playlist={playlist} 
          setSincronizedPlaylist={setSincronizedPlaylist}
          video={video}
        />
      }
      
      <h4>{video.title}</h4>
      <img src={video.imgUrl} alt={video.vid}/>
      <p>{IDIOMA[video.defaultLanguage.substring(0,2)]}</p>
    </div>
  )
}