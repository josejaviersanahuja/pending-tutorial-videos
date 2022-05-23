import Header from "../../components/Header";
import useUser from "../../hooks/useUser";
import SpinnerHome from "./SpinnerHome";

export default function Home() {

  const { user, loginUser, isAuthLoading, setIsAuth } = useUser()

  if (isAuthLoading) return <SpinnerHome />
  return (
    <div className="home__page">
      <Header
        title="Videos Aún Por Ver"
        loginUser={loginUser}
        setIsAuth={setIsAuth}
      />
      <main>
        <h2>Esto es la Home</h2>
        {isAuthLoading && <p>Loading...</p>}
      </main>
    </div>
  );
}
