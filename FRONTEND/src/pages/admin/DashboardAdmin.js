  import React, { useState } from 'react'

import { Route,BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import Clubs from '../../components/clubs/Clubs';
import Events from '../../components/events/Events';
import Salles from '../../components/salles/Salles';
import Users from '../../components/users/Users.js';
import ContentWrapper from '../../components/ContentWrapper';
import AllActualities from '../../components/actualities/AllActualities';
import AdminNavBar from './AdminNavBar';
import AdminSideBar from './AdminSideBar';
import ClubDetails from '../../components/clubs/ClubDetails';
import ClubEdit from '../../components/clubs/ClubEdit';
import ClubEditByAdmin from '../../components/clubs/ClubEditByAdmin';
import CreateSalle from '../../components/salles/CreateSalle';
import EditSalle from '../../components/salles/EditSalle';
import CreateActuality from '../../components/actualities/CreateActuality';
import EditActuality from '../../components/actualities/EditActuality';


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

          case "/admin/actualities/createActuality":
            return <CreateActuality/>
            break;

            case "/admin/actualities/editActuality":
              return <EditActuality/>
              break;

          case "/admin/actualities":
            return <AllActualities/>
            break;

            case "/admin/users":
              return <Users />;
              break;

        case "/admin/clubs":
          return <Clubs />;
          break;

          case "/admin/clubs/edit":
            return <ClubEditByAdmin />;
            break;

        case "/admin/salles/createSalle":
          return <CreateSalle/>
          break;
          
        case "/admin/salles/editSalle/":
          return <EditSalle id={location.state.id} />;
          break;

        case "/admin/events":
          return <Events />;
          break;
          case "/admin/salles":
            return <Salles />;
            break;
  
        default:
          return <ContentWrapper/> 
          break;
      }
    };
    React.useEffect(() => {
      // console.log( userInfo.data.role=="admin")
      // if (userInfo != null &&  userInfo.data.role == "admin") {
      //   setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      //   // document.documentElement.scrollTop = 0;
      //   // document.scrollingElement.scrollTop = 0;

      // } else {
      //   return navigate("/");
      // }
    }, [ location,localStorage.getItem("userinfo")]);


  return (
    <div className="wrapper">
    {/* Preloader */}
      <div className="preloader flex-column justify-content-center align-items-center">
        <img className="animation__wobble" src="./dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
      </div>

    {/* Navbar */}

    {/* /.navbar */}
 <AdminNavBar/>
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
