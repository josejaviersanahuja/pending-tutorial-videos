import React from 'react'
import { useLocation } from 'react-router-dom';
import { updatePlayList } from '../../firebase/firestore';
import useListOfPlayLists from '../../hooks/useListOfPlayLists';
import LikeIcon from '../../icons/LikeIcon';
import VideosIcon from '../../icons/VideosIcon';
import { IPlayList, IUser, OPTIONS_FOR_LISTOFPLAYLIST } from '../../interfaces'

type Props = {
  user: IUser|null
  currentUser ? : IUser | null
}
// @TODO en userPage no sale likebtn nunca. eso esta mal
export default function ListsOfPlaylists({ user, currentUser}: Props) {

  const location = useLocation()

  let listOfPlaylistOption = user === null || user.uid === ""? OPTIONS_FOR_LISTOFPLAYLIST.HomeAndUserFalsy : OPTIONS_FOR_LISTOFPLAYLIST.HomeAndUserTruthy
  if (location.pathname.substring(1,5)=== "user") {
    listOfPlaylistOption = OPTIONS_FOR_LISTOFPLAYLIST.UserPage
    
  }
  const {listOfPlaylists} = useListOfPlayLists({listOfPlaylistOption, iuser:user})

  
  const isUserFaulty = user===null || user?.uid===""
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
        console.log(currentUser.email, user?.email, pl.likes);
      } else {
        pl.likes.push(currentUser.uid)
      }
      updatePlayList(pl)
    } else {
      if (user && user.uid) {
        if (hasThisUserLikedThisPlayList(pl)) {
          pl.likes = pl.likes.filter(e => e!== user.uid)
        } else {
          pl.likes.push(user.uid)
        }
        updatePlayList(pl)
      }
    }
  }

  return (
    <div className='list__of__playlist__wrapper'>
      {listOfPlaylists.map((e)=> <div key={e.plid} className='playlistcard__component' onClick={()=>{}}>
      <h3>{e.name}</h3>
      <p>{e.description}</p>
      {
        !isUserFaulty 
        && !isUserOwnerOfThisPlaylist(e) 
        &&<button 
          className='playlistcard__component__likebtn'
          style={hasThisUserLikedThisPlayList(e) ? {opacity:1} : {opacity:0.35}}
          onClick={()=>{handleLikeBtn(e)}}
          >
            <LikeIcon/>
          </button>
      }
      <div className='playlistcard__footer'>
        <button><LikeIcon/>{e.numLikes}</button>
        <button><VideosIcon/>{e.videos.length}</button>
      </div>
    </div>)}
    </div>
  )
}