import React from 'react'
import { Link } from 'react-router-dom'
import DashBoardIcon from '../../icons/DashBoardIcon'
import HomeIcon from '../../icons/HomeIcon'
import WorldGlobeIcon from '../../icons/WorldGlobeIcon'

export default function FooterBtns() {
  return (
    <div className='footer__btns'>
      <Link to={"/"}><HomeIcon/>.</Link>
      <Link to={"/dashboard"}><DashBoardIcon/>.</Link>
      <Link to={"/allusers"}><WorldGlobeIcon/>.</Link>
    </div>
  )
}