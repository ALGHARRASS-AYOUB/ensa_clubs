
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { useRef } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import navLinks from "../utils/constants/navLinks";
import { useAuth } from "../context/AuthContext";

import {
  faCar,
  faClock,
  faEarth,
  faPhone,
  faSign,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, NavDropdown, Toast } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';


import { toast } from "react-toastify";





const NavBar = ({navLinks}) => {
  const menuRef = useRef(null);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const navigate=useNavigate()

   const {logout} = useAuth('');
   const logoutHandler = () => {

    const res=logout(); 
   
    toast.error('logged out')
  navigate('/')
       setUserInfo(null)
}
   

   
const UserMenuHead = (
  <Image
    src={userInfo?.photo || 'https://pixy.org/src/120/thumbs350/1206832.jpg'}
    alt="UserName profile image"
    roundedCircle={true}
    style={{ width: '30px', height: '30px', border: '1px solid #3b8ac3' }}
  />
)



   useEffect(() => {

           const userinfo = userInfo
   ? JSON.parse(localStorage.getItem('userinfo')) : null
   if(userinfo!=null){
    setUserInfo(userinfo.data)
  }
   },[localStorage.getItem('userinfo')])






  return (
    <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Ensa Clubs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           {navLinks.map((item,index)=>    <Nav.Link key={index} href={item.path}> { item.display } </Nav.Link>
           )}



    
      {userInfo  ?
       <>
 <NavDropdown title={UserMenuHead} id="navbarScrollingDropdown">

                        <LinkContainer to='/profile' >
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
  
                      {(userInfo.role == 'president')? (
                        <LinkContainer to='/president'>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      ):<></>}
  
                      {( userInfo.role ==  'admin')? (
                        <LinkContainer to='/admin/dashboard'>
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                      ):<></>}
  
                      <LinkContainer to='/settings'>
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                      </LinkContainer>

                

                      <NavDropdown.Item   onClick={logoutHandler} >
                        Logout
                      </NavDropdown.Item>
                        
                        {/* <Nav.Link className="bg-black" href="/logout"> Logout </Nav.Link> */}

                         </NavDropdown>
       </>
       : (
                          <>
                            <Nav.Link href="/login"> Login </Nav.Link>
                             
                            <Nav.Link href="/register"> Register</Nav.Link>                          
                          </>)}

      
          </Nav>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavBar

