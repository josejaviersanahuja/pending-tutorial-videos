import React from 'react'
import FacebookIcon from '../../icons/FacebookIcon'
import GithubIcon from '../../icons/GithubIcon'
import GoogleIcon from '../../icons/GoogleIcon'

type Props = {}

export default function LoginButtons({}: Props) {
  return (
    <div className='login__page__btns'>
        <button>
          Google <GoogleIcon/>
        </button>
        <button>
          Facebook <FacebookIcon/>
        </button>
        <button>
          Github<GithubIcon/>
        </button>
    </div>
  )
}