  import React, { useState } from 'react'

import { Route,BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import Clubs from '../../components/clubs/Clubs';
import PresidentEvents from '../../components/events/PresidentEvents';
import CreateEvent from '../../components/events/CreateEvent';
import EditEvent from '../../components/events/EditEvent';

import Salles from '../../components/salles/Salles';

import ContentWrapper from '../../components/ContentWrapper';
import PresidentNavBar from './PresidentNavBar';
import PresidentSideBar from './PresidentSideBar';
import MyClub from '../../components/clubs/MyClub';
import ClubEdit from '../../components/clubs/ClubEdit';


  const DashboardPresident = () =>{
  
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(
      JSON.parse(localStorage.getItem("userinfo"))
    );
    const location=useLocation()

    const getRoutes = () => {
      switch (location.pathname) {


        case "/president/dashboard":
          return <ContentWrapper/>
          break;

         case "/president/MyClub":
          
          return <MyClub/>
          break;  

        case "/president/clubs":
          return <Clubs />;
          break;
        case "/president/events":
          return <PresidentEvents />
          break;
          case "/president/salles":
            return <Salles />;
            break;

            case "/president/createEvent":

              return <CreateEvent/>
              break;

              case "/president/editEvent":
                return <EditEvent/>
                break;

            case "/president/editMyclub":
              return <ClubEdit/>
              break;
  
        default:
          return <ContentWrapper/> 
          break;
      }
    };
    React.useEffect(() => {
      // console.log( userInfo.data.role=="president")
      // if (userInfo != null &&  userInfo.data.role == "president") {
      //   setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      //   document.documentElement.scrollTop = 0;
      //   document.scrollingElement.scrollTop = 0;

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
      <PresidentNavBar/>
    {/* /.navbar */}
    {/* Main Sidebar Container */}
      <PresidentSideBar/>
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
  export default DashboardPresident;
