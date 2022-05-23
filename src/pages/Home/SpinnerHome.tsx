import React from 'react'
import SpinnerHeader from '../../components/Header/SpinnerHeader'

export default function SpinnerHome() {
  return (
    <div className="home__page">
      <SpinnerHeader />
      <main>
        <h2 className='spinner'>.</h2>
      </main>
    </div>
  )
}