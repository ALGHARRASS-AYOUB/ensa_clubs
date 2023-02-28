
import {Container,Button,Stack,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from './pages/Home';
import Setting from './pages/Settings';
import Logout from './pages/Logout';
import Login from './pages/Login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardPresident from './pages/president/DashboardPresident';
import Register from './pages/Register'
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import President from './pages/President';
import RegisterClub from './pages/president/RegisterClub';
import { ClubContextProvider } from './context/ClubContext';
import { ActualityContextProvider } from './context/ActualityContext';
import { UserContextProvider } from './context/UserContext';
import { SalleContextProvider } from './context/SalleContext';
import { EventContextProvider } from './context/EventContext';
import VerificationEmail from './pages/VerificationEmail';
import Verified from './pages/Verified';


function App() {
  return (
    <>
    <Router>

            <AuthContextProvider>
                <Header/>
                <ClubContextProvider>
                  <ActualityContextProvider>
                  <UserContextProvider>
                    <SalleContextProvider>
                    <EventContextProvider>



                <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/setting" element={<Setting />} />
                {/* <Route path="/actualities" element={< />} />
                <Route path="/newst/actualities" element={<Login />} /> */}
                <Route path="/club-register" element={<RegisterClub />} />
                <Route path="/president/*" element={<DashboardPresident />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<DashboardAdmin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/email-verification/:status" element={<VerificationEmail />} />
                <Route path="/email-verification/verified/email_verify_url/http://localhost/api/v1/verify-email/:id/:hash" element={<Verified />} />
                {/* <Route path="/logout" element={<Logout />} /> */}
                
              </Routes>
              </EventContextProvider>

              </SalleContextProvider>

              </UserContextProvider>

              </ActualityContextProvider>
            
                </ClubContextProvider>
              </AuthContextProvider>
</Router>
    </>
  );
}

export default App;
