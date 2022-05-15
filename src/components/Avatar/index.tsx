import React from 'react'
import useUser from '../../hooks/useUser'

type Props = {
    size ?: number
}

export default function Avatar({size = 48}: Props) {
    const {loginUser} = useUser()

    if (!loginUser) {
        return null
    } else {
        return (
                <img
                    src={loginUser.photoURL || "no image"}
                    width={size}
                    height={size}
                    alt="no imag"
                    className='avatar'
                />
          )
    }
}