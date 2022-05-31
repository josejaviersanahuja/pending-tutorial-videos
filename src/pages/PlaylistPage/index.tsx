import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import { playlistConverterFromAny } from '../../firebase/lib'
import useUser from '../../hooks/useUser'
import PlaylistPageMain from './PlaylistPageMain'

export default function PlaylistPage() {

  // const {id} = useParams()
  const {state} = useLocation()
  const pl = playlistConverterFromAny(state)
  const {loginUser, setIsAuth} = useUser()

  // con esto vamos a traer de firestore los videos del playlist de la coleccion videos
  
  return (<>
      <div className='playlistpage'>
        <Header
          loginUser={loginUser}
          title={pl.name.substring(0,20)}
          setIsAuth={setIsAuth}
        />
        <PlaylistPageMain pl={pl} />
      </div>
    </>)
}