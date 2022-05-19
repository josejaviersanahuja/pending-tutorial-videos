import { useState, Dispatch, SetStateAction } from "react"
import { UpdateUser } from "../firebase/firestore"
import {IUser} from '../interfaces'

interface Props{
  userFromThisCard : IUser,
  currentUser: IUser | null
  setStateAction ? : Dispatch<SetStateAction<IUser|null|undefined>>
}
export default function useFollowUnFollowBtn ({userFromThisCard, currentUser, setStateAction}:Props) {
  const [userToRender, setUserToRender] = useState<IUser>(userFromThisCard)
  /**
   * currentUser puede null, porque los perfiles son públicos. En cuyo caso no debe haber botones
   * el userToRender puede ser nuestro mismo perfil. Tmp debe haber botones
   * si userToRender !== de currentUser verificamos si ya lo seguimos o no. 
   *    En este caso mostramos follow btn o unfollow btn
   */
  const showFollowBtn = currentUser !== null && userToRender.uid !== currentUser.uid && 
                        !userToRender.followers.includes(currentUser.uid) && 
                        !currentUser.following.includes(userToRender.uid)
  const showUnFollowBtn = currentUser !== null && userToRender.uid !== currentUser.uid  && 
                          userToRender.followers.includes(currentUser.uid) && 
                          currentUser.following.includes(userToRender.uid)
  
    
  const handleClickFollow = () => {
    if (currentUser !== null) {
      const newUserToRender = {...userToRender, followers: userToRender.followers.concat([currentUser.uid])}
      setUserToRender(newUserToRender)  
      UpdateUser(newUserToRender)
      const newCurrentUser = {...currentUser, following: currentUser?.following.concat([userToRender.uid])}
      setStateAction && setStateAction(newCurrentUser)
      UpdateUser(newCurrentUser) 
    }
  }

  const handleClickUnFollow = () => {
    if (currentUser !== null) {
      const newUserToRender = {...userToRender, followers: userToRender.followers.filter(e => e!==currentUser.uid)}
      setUserToRender(newUserToRender)  
      UpdateUser(newUserToRender)
      const newCurrentUser = {...currentUser, following: currentUser.following.filter(e=> e!==userToRender.uid )}
      setStateAction && setStateAction(newCurrentUser)
      UpdateUser(newCurrentUser) 
    }
  }

  return {handleClickFollow, handleClickUnFollow, userToRender, showFollowBtn, showUnFollowBtn}
}