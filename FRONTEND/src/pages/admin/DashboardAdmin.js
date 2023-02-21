  import React, { useState } from 'react'
import AdminNavBar from './AdminNavBar';
import AdminSideBar from './AdminSideBar';
import { Route,BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import Clubs from '../../components/clubs/Clubs';
import Events from '../../components/events/Events';
import Salles from '../../components/salles/Salles';
import Users from '../../components/users/Users.js';
import ContentWrapper from '../../components/ContentWrapper';
import Actuality from '../../components/actualities/Actuality';

  const DashboardAdmin = () =>{
  
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(
      JSON.parse(localStorage.getItem("userinfo"))
    );
    const location=useLocation()

    const getRoutes = () => {
      switch (location.pathname) {

        case "/admin/dashboard":
          return <ContentWrapper/>
          break;

          
        case "/admin/actualities":
          return <Actuality />;
          break;

        case "/admin/users":
          return <Users />;
          break;
        case "/admin/clubs":
          return <Clubs />;
          break;
        case "/admin/events":
          return <Events />;
          break;
          case "/admin/salles":
            return <Salles />;
            break;
  
        default:
          return "/admin"
          break;
      }
    };
    // React.useEffect(() => {
    //   console.log( userInfo.data.role=="admin")
    //   if (userInfo != null &&  userInfo.data.role == "admin") {
    //     setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    //     document.documentElement.scrollTop = 0;
    //     document.scrollingElement.scrollTop = 0;

    //   } else {
    //     return navigate("/");
    //   }
    // }, [ location,localStorage.getItem("userinfo")]);


  return (
    <div className="wrapper">
    {/* Preloader */}
    <div className="preloader flex-column justify-content-center align-items-center">
      <img className="animation__wobble" src="%PUBLIC_URL%/dist/img/AdminLTELogo.png" alt="admin" height={60} width={60} />
    </div>
    {/* Navbar */}
      <AdminNavBar/>
    {/* /.navbar */}
    {/* Main Sidebar Container */}
      <AdminSideBar/>
    {/* Content Wrapper. Contains page content */}



    <div className='content-wrapper'>
      {/* <ContentWrapper content={'first'}/> */}
      {getRoutes()}
    {/* <Router>
          <Routes>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/clubs" element={<Clubs/>} />
          <Route path="/admin/events" element={<Events />} />
          <Route path="/salles" element={<Salles />} />
          </Routes>
        </Router> */}
    </div>


    {/* /.content-wrapper */}
    {/* Control Sidebar */}
    <aside className="control-sidebar control-sidebar-dark">
      {/* Control sidebar content goes here */}
    </aside>
    {/* /.control-sidebar */}
    {/* Main Footer */}

  </div>
    )
  }
  export default DashboardAdmin;
