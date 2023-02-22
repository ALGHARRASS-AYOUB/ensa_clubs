
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const {login,isLoading,setLoading}=useAuth('')

async function handleSubmit(e){
  e.preventDefault();

  const userinfo=await login(email,password);
  if(!userinfo){
    toast.error('invalid credentials')
    setLoading(false)
  }
  else{
    const role=userinfo.data.data.role;
  console.log('user info in login:',userinfo.data.data)
  console.log('user info in login after role :',role)

  if(role=="admin")
  navigate('/admin')
  else
  navigate('/president')

  toast.success('you are logged in')

  }
}


  return (
    <Container
    className='d-flex flex-column align-items-center justify-center'
    style={{ marginTop: '50px' }}
  >
      <ToastContainer />
        <h1
          className=' text-center'
          style={{
            marginTop: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
          }}
        >
          Sign <span style={{ color: '#DC0000' }}>In</span>
        </h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
      <Form.Text className="text">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit" disabled={isLoading}>
    Sign In {isLoading && <Spinner animation='grow' />}
    </Button>
  </Form>
  <Row className='py-3 text-center'>
          <Col>
            Don't have an account?{' '}
            <Link
              to={'/register'}
              style={{ color: '#DC0000' }}
              className='text-decoration-none'
            >
              Sign Up
            </Link>
          </Col>
        </Row>
  </Container>
    )
}

export default Login