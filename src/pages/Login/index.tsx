import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import useUser from "../../hooks/useUser";
import LoginButtons from "./LoginButtons";

export default function Login() {

  const {loginUser, setIsAuth, isAuth} = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if(isAuth) navigate(location.state && typeof location.state == 'string' ? location.state : '/', {replace:true})
  }, [isAuth, navigate, location])
     
     
  return (
    <div className="login__page">
      <Header
        title="Inicio de Sesión"
        loginUser={loginUser}
        isloginpage
        setIsAuth={setIsAuth}
      />
      <main>
        <h2>Únete con tu cuenta de google, facebook o github</h2>
        <LoginButtons />
        <p>{loginUser?.email}</p>
      </main>
    </div>
  );
}
