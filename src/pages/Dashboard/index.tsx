import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import useTimeout from '../../hooks/useTimeout'
import useUser from '../../hooks/useUser'

export default function Dashboard() {

    const {loginUser, user} = useUser()
    const navigate = useNavigate()
    useTimeout(()=>{
        if (loginUser === null) {
            navigate("/login")
        }
    }, 5000)

  return (
    <div className='dashboard__page'>
        <Header title="Dashboard" loginUser={loginUser} />
        <main>
            {!loginUser && <h4>Debes estar logueado para crear tus colecciones.</h4>}
            { user === undefined && <p>Loading...</p>}
        </main>
    </div>
  )
}