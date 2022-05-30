import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { forkPlaylist, updatePlayList } from '../../firebase/firestore';
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
  const navigate = useNavigate()
  
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

  const handleFork = (pl:IPlayList) => {
    // por reusar ListsOfPlaylists en distintos sitios tengo el siguiente comportamiento anomalo
    // si currentUser es null, el user es el currentUser
    // si currentUser es truthy, user = otherUser
    if (!isUserOwnerOfThisPlaylist(pl) && !isUserFaulty && user !== null) {
      const userThatForks = currentUser === null ? user : currentUser
      if (userThatForks.videoPlayLists.length < 10) {
        forkPlaylist(pl, userThatForks)
      } else {
        alert("Máximo puedes tener 10 playlist")
      }
    }
  }

  return (
    <div className='list__of__playlist__wrapper'>
      {listOfPlaylists.map((e)=> <div key={e.plid} className='playlistcard__component' onClick={()=>{navigate(`/playlist/${e.plid}`, {state:e})}}>
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
          onClick={()=>handleFork(e)}
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