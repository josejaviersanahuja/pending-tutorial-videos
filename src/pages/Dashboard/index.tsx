import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import useTimeout from '../../hooks/useTimeout'
import useUser from '../../hooks/useUser'
import DashboardComponent from './DashboardComponent'

export default function Dashboard() {

    const {loginUser, user, setUser, isAuthLoading} = useUser()
    const navigate = useNavigate()
    const location = useLocation()
    
    useTimeout(()=>{
        if (loginUser === null) {
            navigate("/login" , {state: location.pathname})
        }
    }, 5000)
console.log(isAuthLoading, loginUser);

  return (
    <div className='dashboard__page'>
        <Header title="Dashboard" loginUser={loginUser} />
        <main className='main__dashboard'>
            {!loginUser && !isAuthLoading &&<h4>Debes estar logueado para crear tus colecciones.</h4>}
            { isAuthLoading && <p>Loading...</p>}
            { user && <DashboardComponent iuser={user} setUser={setUser} />}
        </main>
    </div>
  )
}