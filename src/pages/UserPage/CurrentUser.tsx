import { User } from 'firebase/auth'
import { EMPTY_USER_TYPE, IUser } from '../../interfaces'
import FullPresentationCard from './FullPresentationCard'
import ShowUserCollection from './ShowUserCollection'

type Props = {
  user: IUser | null
  loginUser : User | null| EMPTY_USER_TYPE
}

export default function CurrentUser({ user, loginUser}: Props) {
  if (user === null)  return null
  //if (isAuthLoading) return <LoadingComponent loginUser={loginUser}/>
  return (<>
      <FullPresentationCard iuser={user} isCurrentUser currentUser={user}/>
      <ShowUserCollection iuser={user} />
  </>)
}