import React from 'react'
import SpinnerAvatar from '../Avatar/SpinnerAvatar'

export default function SpinnerHeader() {
  return (
    <header>
      <SpinnerAvatar />
      <h1 className='spinner'>.</h1>
  </header>
  )
}