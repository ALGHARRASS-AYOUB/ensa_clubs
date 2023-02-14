import React from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav=useNavigate()
    const {logout}=useAuth()
    const res=logout();
    
    toast.error('logged out')
  nav('/login')
}

export default Logout