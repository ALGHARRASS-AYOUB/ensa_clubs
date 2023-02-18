import {
    faCar,
    faClock,
    faEarth,
    faPhone,
    faSign,
    faSignIn,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useEffect, useState,useNavigate } from "react";
  import { Container, Row, Col, Image, NavDropdown, Toast } from "react-bootstrap";
  import Navbar from "./NavBar";
  import { Link } from "react-router-dom";
  import navLinks from "../utils/constants/navLinks";
  import '../assets/css/header.css';
  import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from "../context/AuthContext";
import Logout from "../pages/Logout";
import { toast } from 'react-toastify';

  
  
  
const Header = () => {
    

  

  
    return (
      <header className='header'>
        {/* ============ header top ============ */}
   
  
        {/* ========== main navigation =========== */}
        <Navbar navLinks={navLinks} />
      </header>
    );
  };
  
  export default Header;
  