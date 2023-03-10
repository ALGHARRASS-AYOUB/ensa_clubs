import moment, { now } from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownButton, Dropdown ,FloatingLabel, Form, ListGroup, Row, Col } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEvent } from '../../context/EventContext'
import { useSalle,isLoading } from '../../context/SalleContext'

const CreateEvent = () => {
const {getDispoAndNotReservedSalles}=useSalle('')
const {store,show}=useEvent('')
const [event,setEvent]=useState()
const [name,setName]=useState()
const [startAt,setStartAt]=useState()
const [endAt,setEndAt]=useState()
const [description,setDescription]=useState()
const [image,setImage]=useState(null)

const [sallesTosend,setSallesTosend]=useState('')
const [salles,setSalles]=useState([])
const [sallesDispo,setSallesDispo]=useState(null)
const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault()
  storeEvent();
}

const fetchSalles=async()=>{
  const _salles=await getDispoAndNotReservedSalles()
  setSallesDispo(_salles?.data.data)
}



const handleCheck=(e)=>{
  console.log('when checked:',e,e.target.value)

  if(e.target.checked && !salles.includes(parseInt(e.target.value))){
    salles.push(parseInt(e.target.value))
    parseInt()
  }
  
  if(!e.target.checked && salles.includes(parseInt(e.target.value))){
    salles.pop(parseInt(e.target.value))
  }
  setSallesTosend('['+salles.toString()+']')

  console.log('salles table:',salles)
  console.log('salles table:','['+salles.toString()+']')


}

const storeEvent=async()=>{
  console.log('updating ......         ',name,description,startAt,sallesTosend,image,sallesTosend )

  const _event=await store(name,description,startAt,endAt,image,sallesTosend);

  
  console.log('res update',_event)
  if(_event?.data.data)
  toast.success('the event has been created')
  setEvent(_event?.data.data)
  setName(_event?.data.data.name)
  setDescription(_event?.data.data.description)
   navigate('/president/events')
}

useEffect(()=>{

  fetchSalles()

 
},[])





  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Create an Event</h3>
  
              { sallesDispo  &&
                      <Form onSubmit={e=>handleSubmit(e)} encType={'multipart/form-data'}>
                             <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="name" name='name' onChange={e=>{setName(e.target.value)}} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="name">Name</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4' label="Description">
                <Form.Control
                name='description'
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  onChange={e=>{setDescription(e.target.value)}}
                />
              </FloatingLabel>
    

                <Row>
                  <Col>
                  <div className="mt-2 mb-5 pb-2">
                  <div className="form-outline form-white">
                    <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title="salles to reserve"
                    className="my-2 "
                  >
                      <ListGroup    style={{ maxHeight:'15rem' ,overflowY:'scroll',borderRadius:'10px',boxShadow:' inset 0 0 6px rgba(0,0,0,.3)'}} >
                      {
                      sallesDispo.map((s)=>{
                       return  <div key={s.id} className="m-1 mx-2">
                               <ListGroup.Item className='px-3' style={{borderRadius:'10px',boxShadow:' inset 0 0 6px rgba(0,0,0,.3)'}}>
                                  <Form.Check    >
                                    <Form.Check.Input name='salles[]' type='checkbox' value={s.id}  isValid  onChange={e=>{ handleCheck(e)}}  />
                                    <Form.Check.Label className='text-white'>{s.name}</Form.Check.Label>
                                </Form.Check>
                               </ListGroup.Item>
                          </div>
                      })
                      }
        
                    </ListGroup>
                  </DropdownButton>
                  </div>
                </div>
                  </Col>
                  <Col className='m-2'>
                  <label htmlFor="startdate">starting date : </label><Form.Control format='Y-m-d H:i:s'  placeholder={ moment(new Date(startAt)).format('YYYY-MM-DD')} type='Date'   name='startAt' min={moment(Date.now()).format("YYYY-MM-DD") }    onChange={e=>{setStartAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} }    />
                  </Col>
                  <Col className='m-2'>
                  <label htmlFor="enddate">ending date : </label><Form.Control type='Date' format='Y-m-d H:i:s'  min={moment(Date.now()).format("YYYY-MM-DD") }  onChange={e=>setEndAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} placeholder={moment(endAt).format('YYYY-MM-DD')} />
                  </Col>
                </Row>
                <div className="mb-4">
                  <div className="form-outline form-white">
                    <input type="file" name='image'  id="image" className="form-control form-control-lg"  onChange={e=>{setImage(e.target.files[0])}}  />
                    <label className="form-label" htmlFor="image">upload the Image of event</label>
                  </div>
                </div>

                <div className="mt-5  pb-2">
                  <div className="form-outline form-white fw-bold">
                  <Button className='btn btn-success' type='submit'  >SUBMIT</Button>
                  </div>
                </div>         

                <div className="my-2 ">
                  <div className="form-outline form-white">
                  <Link className='btn btn-secondary' to='/president/events' ><i className='mx-1 fa fa-chevron-left'> BACK</i></Link>
                  </div>
                </div>    
              </Form>
              }
  
      </Container>
          
  )
}

export default CreateEvent