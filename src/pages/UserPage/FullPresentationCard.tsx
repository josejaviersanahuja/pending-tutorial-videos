import React, { useState, Dispatch, SetStateAction } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import useFollowUnFollowBtn from '../../hooks/useFollowUnFollowBtn'
import useUser from '../../hooks/useUser'
import { IUser } from '../../interfaces'

type Props = {
  iuser : IUser
  isCurrentUser : boolean
  currentUser : IUser // cuando iuser === currentUser. Cuando viene de CurrentUser Component
  setStateAction ? : Dispatch<SetStateAction<IUser|null|undefined>>// faulty cuando iuser === currentUser no hay follow unfollow btn
}

export default function FullPresentationCard({iuser, isCurrentUser, currentUser, setStateAction}: Props) {

  const userFromThisCard = isCurrentUser ? currentUser : iuser
  const {userToRender, handleClickFollow, handleClickUnFollow, alreadyFollow} = 
      useFollowUnFollowBtn({userFromThisCard,currentUser, setStateAction})
  
  // console.log(userToRender, currentUser, 'user to render y current user');
  return (
    <div className='full__presentation__card'>
			<Avatar user={userToRender} size={90}/>
			<p className='full__presentation__card__name'>{userToRender.name}</p>
			<p className='full__presentation__card__email'>{userToRender.email}</p>
      <Link to={`/following/${userToRender.uid}`} state={userToRender} className="full__presentation__card__following">Following {userToRender.following.length}</Link>
      <Link to={`/followers/${userToRender.uid}`} state={userToRender} className="full__presentation__card__followers">Followers {userToRender.followers.length}</Link>
      {
      !isCurrentUser && !alreadyFollow && <button 
            className="full__presentation__card__followbtn"
            onClick={handleClickFollow}
          >
            Follow
          </button>
      }
      {
        !isCurrentUser && alreadyFollow && <button 
            className="full__presentation__card__followbtn"
            onClick={handleClickUnFollow}
          >
            UnFollow
          </button>
      }
	</div>
  )
}