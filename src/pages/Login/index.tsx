import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import LoginButtons from "./LoginButtons";

interface ILogin {

}

export default function Login({}:ILogin) {

  const {loginUser} = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(loginUser) navigate('/')
  }, [loginUser])
     
  return (
    <div className="login__page">
      <header>
        <h1>Videos Aún Por Ver</h1>
      </header>
      <main>
        <h2>Únete con tu cuenta de google, facebook o github</h2>
        <LoginButtons />
        <p>{loginUser?.email}</p>
      </main>
    </div>
  );
}
