import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import useTimeout from '../../hooks/useTimeout'
import useUser from '../../hooks/useUser'

export default function Dashboard() {

    const {loginUser, user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    useTimeout(()=>{
        if (loginUser === null) {
            navigate("/login" , {state: location.pathname})
        }
    }, 5000)

  return (
    <div className='dashboard__page'>
        <Header title="Dashboard" loginUser={loginUser} />
        <main>
            {!loginUser && <h4>Debes estar logueado para crear tus colecciones.</h4>}
            { user === undefined && <p>Loading...</p>}
            { user && <h4>Colecciones</h4>}
        </main>
    </div>
  )
}