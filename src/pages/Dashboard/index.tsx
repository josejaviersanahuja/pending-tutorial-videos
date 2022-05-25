import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import useTimeout from '../../hooks/useTimeout'
import useUser from '../../hooks/useUser'
import DashboardComponent from './DashboardComponent'
import SpinnerDashboard from './SpinnerDashboard'

export default function Dashboard() {

  const { loginUser, user, setUser, isAuthLoading, setIsAuth } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  let redirectpath = location.pathname
  if (redirectpath.substring(0,10)==='/dashboard') {
    redirectpath = "/"
  }

  useTimeout(() => {
    if (loginUser === null) {
      navigate("/login", { state: redirectpath })
    }
  }, 5000)
  
  if(isAuthLoading) return <SpinnerDashboard loginUser={loginUser} setIsAuth={setIsAuth} />
  return (
    <div className='dashboard__page'>
      <Header title="Dashboard" loginUser={loginUser} setIsAuth={setIsAuth} />
      <main className='main__dashboard'>
        {!loginUser && !isAuthLoading && <h4>Debes estar logueado para crear tus colecciones.</h4>}
        {isAuthLoading && <p>Loading...</p>}
        {user && <DashboardComponent iuser={user} setUser={setUser} />}
      </main>
    </div>
  )
}