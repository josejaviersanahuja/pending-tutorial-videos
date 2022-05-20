import Footer from './components/Footer';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter,  Routes,  Route, } from "react-router-dom";
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';
import AllUsers from './pages/AllUsers';
import Dashboard from './pages/Dashboard';
import Followers from './pages/Followers';
import Following from './pages/Following';

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Home/><Footer/></>}/>
      <Route path="/login" element={<><Login /></>}/>
      <Route path="/user/:id" element={<><UserPage /><Footer/></>}/>
      <Route path="/followers/:id" element={<><Followers /><Footer/></>}/>
      <Route path="/following/:id" element={<><Following /><Footer/></>}/>
      <Route path="/allusers" element={<><AllUsers /><Footer/></>}/>
      <Route path="/dashboard/*" element={<><Dashboard /><Footer/></>}/>
      <Route path="*" element={<><NotFound /><Footer/></>}/>
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
