import useSincronizePlaylist from '../../../../hooks/useSincronizePlaylist'
import LikeIcon from '../../../../icons/LikeIcon'
import VideosIcon from '../../../../icons/VideosIcon'

type Props = {
  plid : string,
  //iuser: IUser
}

export default function PlayListComponent({plid}: Props) {

  const {playlist, handleClick} = useSincronizePlaylist({plid})

  return (
    <div className='playlistcard' onClick={handleClick}>
      <h3>{playlist?.name}</h3>
      <p>{playlist?.description}</p>
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{playlist?.likes.length}</button>
        <button><VideosIcon/>{playlist?.videos.length}</button>
      </div>
    </div>
  )
}