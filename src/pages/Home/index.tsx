import Avatar from "../../components/Avatar";
import useUser from "../../hooks/useUser";
import HomeLoginBtn from "./HomeLoginBtn";

interface IHome {

}

export default function Home({}:IHome) {

  const {user} = useUser()
  
  return (
    <div className="home__page">
      <header>
        <Avatar />
        <h1>Videos Aún Por Ver</h1>
        <HomeLoginBtn />
      </header>
      <main>
        <h2>Esto es la Home</h2>
        { user === undefined && <p>undefined</p>}
        { user === null && <p>null</p>}
        { user && <p>{user.uid}</p>}
      </main>
    </div>
  );
}
