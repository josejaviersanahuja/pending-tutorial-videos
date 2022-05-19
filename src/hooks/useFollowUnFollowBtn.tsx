import { useState, Dispatch, SetStateAction } from "react"
import { UpdateUser } from "../firebase/firestore"
import {IUser} from '../interfaces'

interface Props{
  userFromThisCard : IUser,
  currentUser: IUser
  setStateAction ? : Dispatch<SetStateAction<IUser|null|undefined>>
}
export default function useFollowUnFollowBtn ({userFromThisCard, currentUser, setStateAction}:Props) {
  const [userToRender, setUserToRender] = useState<IUser>(userFromThisCard)
  const alreadyFollow = userToRender.followers.includes(currentUser.uid) && currentUser.following.includes(userToRender.uid)
    //@TODO handleClick to follow
  const handleClickFollow = () => {
    const newUserToRender = {...userToRender, followers: userToRender.followers.concat([currentUser.uid])}
    setUserToRender(newUserToRender)  
    UpdateUser(newUserToRender)
    const newCurrentUser = {...currentUser, following: currentUser.following.concat([userToRender.uid])}
    setStateAction && setStateAction(newCurrentUser)
    UpdateUser(newCurrentUser)
  }

  const handleClickUnFollow = () => {
    const newUserToRender = {...userToRender, followers: userToRender.followers.filter(e => e!==currentUser.uid)}
    setUserToRender(newUserToRender)  
    UpdateUser(newUserToRender)
    const newCurrentUser = {...currentUser, following: currentUser.following.filter(e=> e!==userToRender.uid )}
    setStateAction && setStateAction(newCurrentUser)
    UpdateUser(newCurrentUser)
  }

  return {handleClickFollow, handleClickUnFollow, userToRender, alreadyFollow}
}