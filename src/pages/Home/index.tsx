import useUser from "../../hooks/useUser";
import HomeLoginBtn from "./HomeLoginBtn";

interface IHome {

}

export default function Home({}:IHome) {

  return (
    <div className="home__page">
      <header>
        <h1>Videos Aún Por Ver</h1>
        <HomeLoginBtn />
      </header>
      <main>
        <h2>Esto es la Home</h2>
        
      </main>
    </div>
  );
}
