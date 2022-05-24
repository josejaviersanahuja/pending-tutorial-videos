import { IDIOMA } from '../../firebase/lib';
import { IVideos } from '../../interfaces'

type Props = {
  video: IVideos
}

export default function VideoCards({video}: Props) {

  return (
    <div className='videocard'>
      <h5>{video.title}</h5>
      <img src={video.imgUrl} alt={video.vid}/>
      <p>{IDIOMA[video.defaultLanguage]}</p>
    </div>
  )
}