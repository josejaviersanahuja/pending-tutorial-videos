import Footer from './components/Footer';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter,  Routes,  Route, } from "react-router-dom";
import UserPage from './pages/UserPage';
import NotFound from './pages/NotFound';
import AllUsers from './pages/AllUsers';

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/user/:id" element={<UserPage />}/>
      <Route path="/allusers" element={<AllUsers />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
  <Footer/>
  </>
  );
}

export default App;
