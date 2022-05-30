import React from 'react'
import { useLocation } from 'react-router-dom';
import { updatePlayList } from '../../firebase/firestore';
import useListOfPlayLists from '../../hooks/useListOfPlayLists';
import ForkIcon from '../../icons/ForkIcon';
import LikeIcon from '../../icons/LikeIcon';
import VideosIcon from '../../icons/VideosIcon';
import { ChooseOptionsForListOfPlaylist, IPlayList, IUser } from '../../interfaces'
import FetchedAvatar from '../FetchedAvatar';

type Props = {
  user: IUser|null
  currentUser ? : IUser | null
  search ? : string | undefined
}


// @TODO en userPage no sale likebtn nunca. eso esta mal
export default function ListsOfPlaylists({ user, currentUser = null, search = undefined }: Props) {
  
  const location = useLocation()
  
  const listOfPlaylistOption = ChooseOptionsForListOfPlaylist(location.pathname, user, currentUser, search)
  
  const {listOfPlaylists, isUserFaulty} = useListOfPlayLists({listOfPlaylistOption, iuser:user, search}) 
  
  const isUserOwnerOfThisPlaylist = (pl: IPlayList) => {
    if (currentUser && currentUser.uid) {
      return false
    }
    return pl.uid===user?.uid
  }
  const hasThisUserLikedThisPlayList = (pl:IPlayList) => {
    if (currentUser && currentUser.uid) {
      return pl.likes.includes(currentUser.uid)
    }
    if (user && user.uid) {
      return pl.likes.includes(user.uid)
    }
    return false
  }
  /* const handleNavigateToPlaylist = (pl:IPlayList) => {
    navigate(`/playlist/${pl.plid}`)
    //@TODO playlistpage
  }*/

  const handleLikeBtn = (pl:IPlayList) => {
    if (currentUser && currentUser.uid) {      
      if (hasThisUserLikedThisPlayList(pl)) {
        pl.likes = pl.likes.filter(e => e!== currentUser.uid)
      } else {
        pl.likes.push(currentUser.uid)
      }
      pl.numLikes= pl.likes.length
      updatePlayList(pl)
    } else {
      if (user && user.uid) {
        if (hasThisUserLikedThisPlayList(pl)) {
          pl.likes = pl.likes.filter(e => e!== user.uid)
        } else {
          pl.likes.push(user.uid)
        }
        pl.numLikes= pl.likes.length
        updatePlayList(pl)
      }
    }
  }

  return (
    <div className='list__of__playlist__wrapper'>
      {listOfPlaylists.map((e)=> <div key={e.plid} className='playlistcard__component' onClick={()=>{}}>
      <div className='playlistcard__component__avatar'>
        <FetchedAvatar uid={e.uid} />
      </div>
      <h3>{e.name}</h3>
      <p>{e.description}</p>
      {
        !isUserFaulty 
        && !isUserOwnerOfThisPlaylist(e) 
        && <><button 
          className='playlistcard__component__likebtn'
          style={hasThisUserLikedThisPlayList(e) ? {opacity:1} : {opacity:0.35}}
          onClick={()=>{handleLikeBtn(e)}}
          >
            <LikeIcon/>
          </button>
          <button 
          className='playlistcard__component__fork'
          onClick={()=>{}}
          >
            <ForkIcon />
          </button>
          </>
      }
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{e.numLikes}</button>
        <button><VideosIcon/>{e.videos.length}</button>
      </div>
    </div>)}
    </div>
  )
}