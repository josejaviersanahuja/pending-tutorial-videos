import Footer from './components/Footer';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter,  Routes,  Route, } from "react-router-dom";

function App() {
  return (<>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  </BrowserRouter>
  <Footer/>
  </>
  );
}

export default App;
