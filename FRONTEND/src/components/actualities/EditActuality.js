import moment, { now } from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownButton, Dropdown ,FloatingLabel, Form, ListGroup, Row, Col } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEvent } from '../../context/EventContext'
import { useActuality } from '../../context/ActualityContext'

const EditActuality = ({id}) => {
const {update,show}=useActuality('')
const [title,setTitle]=useState()
const [startAt,setStartAt]=useState()
const [endAt,setEndAt]=useState()
const [body,setBody]=useState()
const [image,setImage]=useState(null)
const [event,setEvent]=useState()

const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault()
  console.log('info',(title,body,startAt,endAt,image))
  updateActuality();
}

const fetchActuality=async()=>{
  const _actuality=await show(id);
  
  

  setTitle(_actuality?.data.data.title)
  setBody(_actuality?.data.data.body)
  setStartAt(_actuality?.data.data.startAt)
  setEndAt(_actuality?.data.data.endAt)
  setEvent(_actuality?.data.data.evenement)
}


const updateActuality=async()=>{

  const _actuality=await update(id,title,body,startAt,endAt,image);
  console.log('res update',_actuality)
  if(_actuality?.data.data){
    
    toast.success('the actuality has been updated')
    setTitle(_actuality?.data.data.title)
    setBody(_actuality?.data.data.body)
    navigate('/admin/actualities')
  }else{
    toast.error(_actuality)
  }
}

useEffect(()=>{
fetchActuality()
},[])

const checkEvent=(id)=>{
  return navigate('/admin/events/DetailsEvent', {
    state: {
      id: id,
    },
  });
}



  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Editting Actuality</h3>
            <hr />
  
              { 
              <Form onSubmit={e=>handleSubmit(e)} encType={'multipart/form-data'}>
    
                {
                  event ? <>
                   <span className=" bg-warning m-2 my-4 p-2 px-4 rounded-pill" style={{width: "150px"}}>this actuality based on a local event. <button className='m-2 pt-1 btn btn-secondary btn-sm rounded-pill' onClick={()=>checkEvent(event.id)}>check for this event</button></span>
                  </>
                  :
                  <>
                              <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="title" name='title' value={title} onChange={e=>{setTitle(e.target.value)}} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="title">title</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4' label="Description">
                <Form.Control
                name='body'
                value={body}
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  onChange={e=>{setBody(e.target.value)}}
                />
              </FloatingLabel>
                  </>
                }
                <Row className='my-2'>
                  <Col className='m-2'>
                  <label htmlFor="startdate">starting date : </label><Form.Control format='Y-m-d H:i:s'   type='Date'  value={ moment(new Date(startAt)).format('YYYY-MM-DD')}  name='startAt' min={moment(Date.now()).format("YYYY-MM-DD") }    onChange={e=>{setStartAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} }    />
                  </Col>
                  <Col className='m-2'>
                  <label htmlFor="enddate">ending date : </label><Form.Control type='Date' format='Y-m-d H:i:s'  value={ moment(new Date(endAt)).format('YYYY-MM-DD')} min={moment(Date.now()).format("YYYY-MM-DD") }  onChange={e=>setEndAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} />
                  </Col>
                </Row>
                <Row>
                {
                  !event &&    
                 <div className="my-4">
                  <div className="form-outline form-white">
                    <input type="file" name='image'  id="image" className="form-control form-control-lg"  onChange={e=>{setImage(e.target.files[0])}}  />
                    <label className="form-label" htmlFor="image">upload the Image of event</label>
                  </div>
                </div>
                }
                </Row>

                <div className="mt-5  pb-2">
                  <div className="form-outline form-white fw-bold">
                  <Button className='btn btn-success' type='submit'  >UPDATE</Button>
                  </div>
                </div>         

                <div className="my-2 ">
                  <div className="form-outline form-white">
                  <Link className='btn btn-secondary' to='/admin/actualities' ><i className='mx-1 fa fa-chevron-left'> BACK</i></Link>
                  </div>
                </div>    
              </Form>
              }
  
      </Container>
          
  )
}

export default EditActuality