import React, { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSalle,isLoading } from '../../context/SalleContext'

const CreateSalle = () => {
const {storeSalle}=useSalle('')

const [name,setName]=useState()
const [isDisponible,setIsDisponible]=useState()
const [description,setDescription]=useState()
const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault()
  console.log('updating ......',name,description,isDisponible )
  const res=store();
}



const store=async()=>{
  const _salle=await storeSalle(name,isDisponible,description);
 if(_salle?.data.data){
   toast.success('the salle has been created')
   navigate('/admin/salles')
 }
 else{
  toast.error('error has been occured while creating salle')
 }
}

useEffect(()=>{

  },[])
  
  



  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Create salle</h3>
  
         
                      <>
                             <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="name" name='name'  onChange={e=>{setName(e.target.value)}} className="form-control form-control-lg" />
                    <label className="form-label" for="name">Name</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4' label="Description">
                <Form.Control
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
   
                  onChange={e=>{setDescription(e.target.value)}}
                />
              </FloatingLabel>
    

              <div className="my-5 pb-2">
                  <div className="form-outline form-white">
                    <label className="form-label" for="disponibility">disponibility salle:</label>
                    <Form.Select id='disponibility' name='isDisponible' onChange={(e)=>{console.log(e.target.value); setIsDisponible(e.target.value)}} size="sm">
                        <option value={0} >not disponible</option>
                        <option value={1} >disponible</option>
                    </Form.Select>

                  </div>
                </div>

                <div className="my-4 pb-2">
                  <div className="form-outline form-white">
                  <Button className='btn btn-success' type='submit' onClick={e=>handleSubmit(e)} >submit</Button>
                  </div>
                </div>         

                <div className="my-4 pb-2">
                  <div className="form-outline form-white">
                  <Link className='btn btn-secondary' to='/admin/salles' >back</Link>
                  </div>
                </div>    

                      </>
              
  
      </Container>
          
  )
}

export default CreateSalle