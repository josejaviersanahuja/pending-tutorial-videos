import { Link } from "react-router-dom";
import Header from "../../components/Header";
import useUser from "../../hooks/useUser";

export default function Home() {

  const { user, loginUser } = useUser()

  return (
    <div className="home__page">
      <Header
        title="Videos Aún Por Ver"
        loginUser={loginUser}
      />
      <main>
        <h2>Esto es la Home</h2>
        {user === undefined && <p>undefined</p>}
        {user === null && <p>null</p>}
        {user && <p>{user.uid}</p>}
        <Link to={"/allusers"}>All Users</Link>
      </main>
    </div>
  );
}
