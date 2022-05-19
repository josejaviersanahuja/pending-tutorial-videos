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
        {user === undefined && <p>Loading...</p>}
      </main>
    </div>
  );
}
