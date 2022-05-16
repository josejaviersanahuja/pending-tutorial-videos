import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import useUser from "../../hooks/useUser";
import HomeLoginBtn from "./HomeLoginBtn";

export default function Home() {

  const {user, loginUser} = useUser()

  return (
    <div className="home__page">
      <header>
        <Avatar user={loginUser}/>
        <h1>Videos Aún Por Ver</h1>
        <HomeLoginBtn user={loginUser}/>
      </header>
      <main>
        <h2>Esto es la Home</h2>
        { user === undefined && <p>undefined</p>}
        { user === null && <p>null</p>}
        { user && <p>{user.uid}</p>}
        <Link to={"/allusers"}>All Users</Link>
      </main>
    </div>
  );
}
