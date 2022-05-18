import React, { useState } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { UpdateUsersWhenFollow } from '../../firebase/firestore'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'

type Props = {
  iuser : IUser
  isCurrentUser : boolean
  currentUser ? : IUser // falty cuando iuser === currentUser. Cuando viene de CurrentUser Component
  setStateAction ? : ()=>void // faulty cuando iuser === currentUser no hay follow unfollow btn
}

export default function FullPresentationCard({iuser, isCurrentUser, currentUser, setStateAction}: Props) {
// paralizamos esto
  const id = currentUser?.uid
  const [userFromThisCard, setuserFromThisCard] = useState<IUser>(iuser)
  const alreadyFollow = id? userFromThisCard.followers.includes(id) : false
  console.log(id, userFromThisCard);
  
  //@TODO handleClick to follow
  const handleClickFollow = () => {
    if (id) {
      const newUserFromThisCard = {...userFromThisCard}
      newUserFromThisCard.followers.concat([id])
      UpdateUsersWhenFollow(newUserFromThisCard, id)
      setuserFromThisCard(newUserFromThisCard)
    }
  }

  return (
    <div className='full__presentation__card'>
			<Avatar user={userFromThisCard} size={90}/>
			<p className='full__presentation__card__name'>{userFromThisCard.name}</p>
			<p className='full__presentation__card__email'>{userFromThisCard.email}</p>
      <Link to={`/following/${userFromThisCard.uid}`} state={userFromThisCard} className="full__presentation__card__following">Following {userFromThisCard.following.length}</Link>
      <Link to={`/followers/${userFromThisCard.uid}`} state={userFromThisCard} className="full__presentation__card__followers">Followers {userFromThisCard.followers.length}</Link>
      {
      !isCurrentUser && !alreadyFollow 
        && <button 
            className="full__presentation__card__followbtn"
            onClick={handleClickFollow}
          >
            Follow
          </button>
          }
      <Outlet/>
	</div>
  )
}