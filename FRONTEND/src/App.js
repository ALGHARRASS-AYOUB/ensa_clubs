
import {Container,Button,Stack,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from './pages/Home';
import Setting from './pages/Settings';
import Logout from './pages/Logout';
import Login from './pages/Login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import Register from './pages/Register'
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import President from './pages/President';
import ClubRegister from './components/ClubRegister';
import RegisterClub from './pages/president/RegisterClub';
import { ClubContextProvider } from './context/ClubContext';
import { ActualityContextProvider } from './context/ActualityContext';


function App() {
  return (
    <>
    <Router>

            <AuthContextProvider>
                <Header/>
                <ClubContextProvider>
                  <ActualityContextProvider>


                <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/setting" element={<Setting />} />
                {/* <Route path="/actualities" element={< />} />
                <Route path="/newst/actualities" element={<Login />} /> */}
                <Route path="/president/*" element={<President />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<DashboardAdmin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/club-register" element={<RegisterClub />} />
                {/* <Route path="/logout" element={<Logout />} /> */}
              </Routes>
              </ActualityContextProvider>
            
                </ClubContextProvider>
              </AuthContextProvider>
</Router>
<Footer/>
    </>
  );
}

export default App;
