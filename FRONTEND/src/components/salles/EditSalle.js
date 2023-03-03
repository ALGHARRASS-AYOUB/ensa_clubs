import React, { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSalle,isLoading } from '../../context/SalleContext'

const EditSalle = ({id}) => {
const {show,updateSalleByAdmin}=useSalle('')
const [salle,setSalle]=useState()
const [name,setName]=useState()
const [isDisponible,setIsDisponible]=useState()
const [description,setDescription]=useState()
const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault()
  console.log('updating ......',name,description,isDisponible )
  const res=updateSalle(id);
}

 const fetchSalle=async()=>{
  const _salle=await show(id);
  setSalle(_salle)
  console.log(_salle?.data.data)
  setName(_salle?.data.data.name)
  setDescription(_salle?.data.data.description)
  setIsDisponible(_salle?.data.data.isDisponible)
}

const updateSalle=async(id)=>{
  const _salle=await updateSalleByAdmin(id,name,isDisponible,description);
 if(_salle?.data.data)
  toast.success('the salle has been updated')
  setSalle(_salle?.data.data)
  setName(_salle?.data.data.name)
  setDescription(_salle?.data.data.description)
  setIsDisponible(_salle?.data.data.isDisponible)
  navigate('/admin/salles')
}

useEffect(()=>{
  fetchSalle()
  console.log('salle use effect ------',salle)
 
  },[])
  
  



  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Update salle</h3>
  
              {salle && 
                      <>
                             <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="name" name='name' value={name} onChange={e=>{setName(e.target.value)}} className="form-control form-control-lg" />
                    <label className="form-label" for="name">Name</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4' label="Description">
                <Form.Control
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  value={ description}
                  onChange={e=>{setDescription(e.target.value)}}
                />
              </FloatingLabel>
    

              <div className="my-5 pb-2">
                  <div className="form-outline form-white">
                    <label className="form-label" for="disponibility">disponibility salle:</label>
                    <Form.Select id='disponibility' name='isDisponible' onChange={(e)=>{console.log(e.target.value); setIsDisponible(e.target.value)}} size="sm">
                        <option value={0} selected={isDisponible==0 }>not disponible</option>
                        <option value={1} selected={isDisponible==1 }>disponible</option>
                    </Form.Select>

                  </div>
                </div>

                <div className="my-4 pb-2">
                  <div className="form-outline form-white">
                  <Button className='btn btn-success' type='submit' onClick={e=>handleSubmit(e)} >Update</Button>
                  </div>
                </div>         

                <div className="my-4 pb-2">
                  <div className="form-outline form-white">
                  <Link className='btn btn-secondary' to='/admin/salles' >Home</Link>
                  </div>
                </div>    

                      </>
              }
  
      </Container>
          
  )
}

export default EditSalle