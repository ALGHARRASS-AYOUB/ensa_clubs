import React, { useState,useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/css/register-club.css'
import background from '../../assets/images/background.jpg'
import activitiesImages from '../../assets/images/club-activity.jpg'

import {useClub} from '../../context/ClubContext'

function RegisterClub() {

const [name,setName]=useState()
const [activityDomaine,setActivityDomaine]=useState()
const [supervisor,setSupervisor]=useState()
const [email,setEmail]=useState()
const [slugon,setSlugon]=useState()
const [logo,setLogo]=useState(null)
const [bureauMembersFile,setBureauMembersFile]=useState(null)
const {store,isLoading,setLoading}=useClub('')
const navigate=useNavigate()


let image='../../assets/images/background.jpg' 
let activitiesImages='https://onramps.utexas.edu/wp-content/uploads/2020/11/group-partnership-scaled.jpg'
  async function handleSubmit(e){
    e.preventDefault()
    console.log('in the handle submission')
    const club=await store (name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile);
    console.log('club info',club,'???',!club)
    if(!club){
      console.log('error occured')
      toast.error('invalid credentials')
      setLoading(false)
    
    }
    else{
      console.log('club has been registered')
      navigate('/')
      toast.success(' user has been registered')
    }
  }
  
  useEffect(()=>{
  console.log(name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile)
  },[name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile])



  return (
    <section className="h-100  gradient-custom-2" >
      <ToastContainer/>
  <div className="container py-5 "  style={{ backgroundImage:"url(../../assets/images/background.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"contain" }}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        <div className="card card-registration card-registration-2 " style={{'bordeRadius': '15px'}}>
          <div className="card-body p-0 ">
            <div className="row g-0 ">
              <div className="col-lg-6" style={{ 'backgroundImage':`url(${activitiesImages})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" }} >
         
              </div>
             <div className="col-lg-6 bg-indigo text-white">
             <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <div className="p-5">
                  <h3 className="fw-normal mb-5">Create your club</h3>

                  <div className="mb-4 pb-2">
                    <div className="form-outline form-white">
                      <input type="text" id="name" name='name' onChange={e=>{setName(e.target.value)}} className="form-control form-control-lg" />
                      <label className="form-label" for="name">Name</label>
                    </div>
                  </div>

                  <div className="mb-4 pb-2">
                    <div className="form-outline form-white">
                      <input type="text" id="slugon" name='supervisor' onChange={e=>setSupervisor(e.target.value)} className="form-control form-control-lg" />
                      <label className="form-label" for="slugon">supervisor</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 mb-4 pb-2">

                      <div className="form-outline form-white">
                        <input type="text" id="activityDomaine" name='activityDomaine' onChange={e=>setActivityDomaine(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label" for="activityDomaine">activity Domaine</label>
                      </div>

                    </div>
                    <div className="col-md-7 mb-4 pb-2">

                      <div className="form-outline form-white">
                        <input type="text" id="slugon" name='slugon' onChange={e=>setSlugon(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label" for="slugon">slugon</label>
                      </div>

                    </div>
                  </div>

         


                  <div className="mb-4">
                    <div className="form-outline form-white">
                      <input type="text" id="email"  name='email'  onChange={e=>{setEmail(e.target.value)}}  className="form-control form-control-lg" />
                      <label className="form-label" for="email">Your Email</label>
                    </div>
                  </div>

                  <div className="row">
                  <div className="mb-4">
                    <div className="form-outline form-white">
                      <input type="file" id="bureauMembersFile"  name='bureauMembersFile'  onChange={e=>{setBureauMembersFile(e.target.files[0])}}  className="form-control form-control-lg" />
                      <label className="form-label" for="bureauMembersFile">upload the your bureau members file</label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-outline form-white">
                      <input type="file" id="logo"  name='logo'  onChange={e=>{setLogo(e.target.files[0])}}  className="form-control form-control-lg" />
                      <label className="form-label" for="logo">upload your logo club</label>
                    </div>
                  </div>
                  </div>



                  <button type="submit"  className="btn btn-light btn-lg"
                    data-mdb-ripple-color="dark">Register</button>

                </div>
             </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default RegisterClub;