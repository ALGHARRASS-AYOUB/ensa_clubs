import React, { useState,useEffect } from 'react';
import '../../assets/css/register-club.css'
import '../../assets/images/background.jpg'

function RegisterClub() {

const [name,setName]=useState()
const [activityDomaine,setActivityDomaine]=useState()
const [supervisor,setSupervisor]=useState()
const [email,setEmail]=useState()
const [slugon,setSlugon]=useState()
const [logo,setLogo]=useState()
const [bureauMembersFile,setBureauMembersFile]=useState()


let image='../../assets/images/background.jpg'

  async function handleSubmit(e){
    e.preventDefault()
    // const userinfo=await register(firstName,lastName,email,cpassword,password,role);
    // console.log('userinfo',userinfo,'???',!userinfo)
    // if(!userinfo){
    //   console.log('invalid cred')
    //   toast.error('invalid credentials')
    //   setLoading(false)
    // }
    // else{
    //   console.log('user has been registered')
    //    navigate("/club-register")
    //   toast.success(' user has been registered')
    // }
  }
  
  useEffect(()=>{
  console.log(name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile)
  },[name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile])



  return (
    <section className="h-100  gradient-custom-2" >
  <div className="container py-5 "  style={{ backgroundImage:"url(../../assets/images/background.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"contain" }}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        <div className="card card-registration card-registration-2" style={{'bordeRadius': '15px'}}>
          <div className="card-body p-0">
            <div className="row g-0">
              <div className="col-lg-6">
                {/* <div className="p-5">
                  <h3 className="fw-normal mb-5" style={{"color": "#4835d4"}}>General Infomation</h3>

                  <div className="mb-4 pb-2">
                    <select className="select">
                      <option value="1">Title</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <input type="text" id="form3Examplev2" className="form-control form-control-lg" />
                        <label className="form-label" for="form3Examplev2">First name</label>
                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <input type="text" id="form3Examplev3" className="form-control form-control-lg" />
                        <label className="form-label" for="form3Examplev3">Last name</label>
                      </div>

                    </div>
                  </div>

                  <div className="mb-4 pb-2">
                    <select className="select">
                      <option value="1">Position</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>

                  <div className="mb-4 pb-2">
                    <div className="form-outline">
                      <input type="text" id="form3Examplev4" className="form-control form-control-lg" />
                      <label className="form-label" for="form3Examplev4">Position</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">

                      <div className="form-outline">
                        <input type="text" id="form3Examplev5" className="form-control form-control-lg" />
                        <label className="form-label" for="form3Examplev5">Bussines Arena</label>
                      </div>

                    </div>
                    <div className="col-md-6">

                      <select className="select">
                        <option value="1">Employees</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                      </select>

                    </div>
                  </div>

                </div> */}
              </div>
              <div className="col-lg-6 bg-indigo text-white">
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
                      <input type="file" id="bureauMembersFile"  name='bureauMembersFile'  onChange={e=>{setBureauMembersFile(e.target.value)}}  className="form-control form-control-lg" />
                      <label className="form-label" for="bureauMembersFile">upload the your bureau members file</label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-outline form-white">
                      <input type="file" id="logo"  name='logo'  onChange={e=>{setLogo(e.target.value)}}  className="form-control form-control-lg" />
                      <label className="form-label" for="logo">upload your logo club</label>
                    </div>
                  </div>
                  </div>



                  <button type="button" className="btn btn-light btn-lg"
                    data-mdb-ripple-color="dark">Register</button>

                </div>
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