import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import useTimeout from '../../hooks/useTimeout'
import useUser from '../../hooks/useUser'
import DashboardComponent from './DashboardComponent'

export default function Dashboard() {

    const {loginUser, user} = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    console.log('que hay aqui', loginUser);
    
    useTimeout(()=>{
        if (loginUser === null) {
            navigate("/login" , {state: location.pathname})
        }
    }, 5000)

  return (
    <div className='dashboard__page'>
        <Header title="Dashboard" loginUser={loginUser} />
        <main className='main__dashboard'>
            {!loginUser && <h4>Debes estar logueado para crear tus colecciones.</h4>}
            { user === undefined && <p>Loading...</p>}
            { user && <DashboardComponent iuser={user}/>}
        </main>
    </div>
  )
}