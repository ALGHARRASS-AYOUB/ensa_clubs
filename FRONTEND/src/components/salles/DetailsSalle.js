import React, { useEffect, useState } from 'react'
import { Badge, Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSalle,isLoading } from '../../context/SalleContext'

const DetailsSalle = ({id}) => {
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)

const {show}=useSalle('')
const [salle,setSalle]=useState()
const [name,setName]=useState()
const [isDisponible,setIsDisponible]=useState()
const [description,setDescription]=useState()
const navigate=useNavigate()



 const fetchSalle=async()=>{
  const _salle=await show(id);
  setSalle(_salle)
  console.log(_salle?.data.data)
  setName(_salle?.data.data.name)
  setDescription(_salle?.data.data.description)
  setIsDisponible(_salle?.data.data.isDisponible)
}

function editSalle(id) {


    return navigate('/admin/salles/editSalle/', {
      state: {
        id: id,
      },
    });
  }

useEffect(()=>{
  fetchSalle()
  console.log('salle use effect ------',salle)
 
  },[])
  
  



  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Details of salle</h3>
  
              {salle && 
                      <>
                             <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input  disabled type="text" id="name" name='name'  value={name} onChange={e=>{setName(e.target.value)}} className="text-white fw-bold form-control form-control-lg" />
                    <label className="form-label" for="name">Name</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='text-white fw-bold py-2 mb-4' label="Description">
                <Form.Control
                className=''
                  as="textarea"
             
                  disabled
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  value={ description}
                  onChange={e=>{setDescription(e.target.value)}}
                />
              </FloatingLabel>
    

              <div className="my-5 pb-2"><span className='mx-2'>status</span>
              {isDisponible == 1 ? <Badge  pill bg="success">Disponible</Badge>:<Badge pill  bg="danger">Not Disponible</Badge>}
                </div>

                <div className="my-4 pb-2">
                  <div className="form-outline form-white">
                 {
                  userInfo.role =='admin' &&
                  <button
                  className='btn btn-fill btn-success mx-2'
                  onClick={() => editSalle(id)}
                  >Edit 
                  <span> <i className='mx-1 fa fa-wrench'></i></span> 
              </button>
                 }
                  <Link className='btn btn-secondary' to={userInfo.role=='admin'?'/president/salles':'/admin/salles'} ><i className='mx-1 fa fa-chevron-left'></i>Back</Link>
                  </div>
                </div> 

               

                      </>
              }
  
      </Container>
          
  )
}

export default DetailsSalle