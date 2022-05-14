import { logout } from "../../firebase/auth";
import useUser from "../../hooks/useUser";

interface IHome {

}

export default function Home({}:IHome) {

  const {loginUser} = useUser()

  return (
    <div className="home__page">
      <header>
        <h1>Videos Aún Por Ver</h1>
      </header>
      <main>
        <h2>Esto es la Home</h2>
        <button onClick={()=>{logout()}}>logout</button>
      </main>
    </div>
  );
}
