import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import useUser from "../../hooks/useUser";
import LoginButtons from "./LoginButtons";

export default function Login() {

  const {loginUser} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(loginUser) navigate('/')
  }, [loginUser, navigate])
     
  return (
    <div className="login__page">
      <Header
        title="Inicio de Sesión"
        loginUser={loginUser}
      />
      <main>
        <h2>Únete con tu cuenta de google, facebook o github</h2>
        <LoginButtons />
        <p>{loginUser?.email}</p>
      </main>
    </div>
  );
}
