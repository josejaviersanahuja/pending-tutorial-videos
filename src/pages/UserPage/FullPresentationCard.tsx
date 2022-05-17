import React from 'react'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { IUser } from '../../interfaces'
import PrivacyPolicy from '../PrivacyPolicy'

type Props = {
  iuser : IUser
  isCurrentUser : boolean
}

export default function FullPresentationCard({iuser, isCurrentUser}: Props) {

  //@TODO handleClick to follow

  return (
    <div className='full__presentation__card'>
			<Avatar user={iuser} size={90}/>
			<p className='full__presentation__card__name'>{iuser.name}</p>
			<p className='full__presentation__card__email'>{iuser.email}</p>
      <Link to={`following`} className="full__presentation__card__following">Following {iuser.following.length}</Link>
      <Link to={`followers`} className="full__presentation__card__followers">Followers {iuser.followers.length}</Link>
      {!isCurrentUser && <button className="full__presentation__card__followbtn">Follow</button>}
      <Outlet/>
	</div>
  )
}