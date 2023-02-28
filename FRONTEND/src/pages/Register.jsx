import React, { useState, useEffect } from 'react'
import '../assets/css/register.css';
import { Link } from 'react-router-dom';
import { Container,Form,Button,Spinner } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';



const Register = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [cpassword,setCpassword]=useState('');
  const [role,setRole]=useState('president');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const {register,isLoading,setLoading}=useAuth('')

async function handleSubmit(e){
  e.preventDefault()
  const userinfo=await register(firstName,lastName,email,cpassword,password,role);
  if(!userinfo){
    console.log('invalid cred')
    toast.error('invalid credentials')
    setLoading(false)
  }
  else{
    
    toast.success(' user has been registered')
    navigate("/email-verification/false")
  }
}

useEffect(()=>{
console.log(firstName,lastName,email,cpassword,password,role)
},[firstName,lastName,email,cpassword,password,role])



return (
<section className="h-100 bg-dark">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-registration my-4">
          <div className="row g-0">
            <div className="col-xl-6 d-none d-xl-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo" className="img-fluid"
                style={{ 'borderTopLeftRadius': '.25rem', 'borderBottomLeftRadius': '.25rem' }} />
            </div>
            <div className="col-xl-6">

              <Form onSubmit={handleSubmit}>
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">User registration </h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="firstName" name='firstName' onChange={e=>{setFirstName(e.target.value)}} className="form-control form-control-lg" />
                      <label  htmlFor="firstName">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="lastName"  name='lastName'  onChange={e=>{setLastName(e.target.value)}}   className="form-control form-control-lg" />
                      <label  htmlFor="lastName">Last name</label>
                    </div>
                  </div>
                </div>

           

                <div className="form-outline mb-4">
                  <input type="email" id="email" name='email'  onChange={e=>{setEmail(e.target.value)}}   className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="email">Email Address</label>
      
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="password" id="password" name='password'  onChange={e=>{setPassword(e.target.value)}}  className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="password">password</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="password" id="cpassword" name='cpassword' onChange={e=>{setCpassword(e.target.value)}}   className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="cpassword">confirm your password</label>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <label className="form-label" htmlFor="user role">user responsability</label>
                  <div className="col-md-6 mb-4">

                    <select className="select" name='role' onChange={e=>{setRole(e.target.value)}}  title='role'>
                      <option value="president" selected>president</option>
                    </select>

                  </div>
         
                </div>

         
  
              </div>
                 <div className="container d-grid gap-2 mb-4 ">    
                        <Button className=' float-end' variant="primary" type="submit" disabled={isLoading}>
                            Sign Up {isLoading && <Spinner animation='grow' />}
                        </Button>
                </div>
              </div>
              </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
  );
}

export default Register