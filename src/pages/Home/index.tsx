import Header from "../../components/Header";
import ListsOfPlaylists from "../../components/ListsOfPlaylists";
import useListOfPlayLists from "../../hooks/useListOfPlayLists";
import useUser from "../../hooks/useUser";
import { OPTIONS_FOR_LISTOFPLAYLIST } from "../../interfaces";
import SpinnerHome from "./SpinnerHome";

export default function Home() {

  const { user, loginUser, isAuthLoading, setIsAuth } = useUser()
  const listOfPlaylistOption = user === null ? OPTIONS_FOR_LISTOFPLAYLIST.HomeAndUserFalsy : OPTIONS_FOR_LISTOFPLAYLIST.HomeAndUserTruthy

  const {} = useListOfPlayLists({listOfPlaylistOption, iuser:user})

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
        {/* <ListsOfPlaylists listPlaylist={} /> */}
      </main>
    </div>
  );
}
