import React from 'react'
import FacebookIcon from '../../icons/FacebookIcon'
import GithubIcon from '../../icons/GithubIcon'
import GoogleIcon from '../../icons/GoogleIcon'
import {handleGoogleLogIn, handleGithubLogIn, handleFacebookLogIn} from '../../firebase/auth'

type Props = {}

export default function LoginButtons({}: Props) {
  return (
    <div className='login__page__btns'>
        <button 
          onClick={()=>{handleGoogleLogIn()}}
          style={{backgroundColor:"#6288ff", color:"white"}}
        >
          Google <GoogleIcon/>
        </button>
        <button 
          onClick={()=>{handleFacebookLogIn()}}
          style={{backgroundColor:"white", color:"#4268ff"}}
        >
          Facebook <FacebookIcon/>
        </button>
        <button
          onClick={()=>{handleGithubLogIn()}}
          style={{backgroundColor:"white", color:"black"}}
        >
          Github<GithubIcon/>
        </button>
    </div>
  )
}