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
      {playlist.imgUrl !== "" && <img src={playlist.imgUrl} alt={playlist.plid} className="playlist__background__img"/>}
      <h3>{playlist?.name}</h3>
      <p>{playlist?.description}</p>
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{playlist?.numLikes}</button>
        <button><VideosIcon/>{playlist?.videos.length}</button>
      </div>
    </div>
  )
}