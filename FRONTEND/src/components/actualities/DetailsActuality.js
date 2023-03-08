import moment, { now } from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownButton, Dropdown ,FloatingLabel, Form, ListGroup, Row, Col } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEvent } from '../../context/EventContext'
import { useActuality } from '../../context/ActualityContext'

const DetailsActuality = ({id}) => {
const {update,show}=useActuality('')
const [title,setTitle]=useState()
const [startAt,setStartAt]=useState()
const [endAt,setEndAt]=useState()
const [body,setBody]=useState()

const [event,setEvent]=useState()
const [image,setImage]=useState('')
const [Url,setUrl]=useState('http://localhost:80')
const navigate=useNavigate()




const fetchActuality=async()=>{
  const _actuality=await show(id);

  setTitle(_actuality?.data.data.title)
  setBody(_actuality?.data.data.body)
  setStartAt(_actuality?.data.data.startAt)
  setEndAt(_actuality?.data.data.endAt)
  setEvent(_actuality?.data.data.evenement)
}

const _editActuality=(id)=>{
    return navigate('/admin/actualities/EditActuality', {
      state: {
        id: id,
      },
    });
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
              
            <h3 className="fw-normal mb-5">Details Actuality</h3>
            <hr />
                
             {image && 
                <div className="mb-4 pb-2">
                <img src={Url+image} alt="" style={{ 'borderRadius':'8rem','maxHeight':'30rem',maxWidth:'40rem' }} />
              </div>
             }
              { 
              <Form  >
    
                {
                  event ? <>
                   <span className=" bg-warning m-2 my-4 p-2 px-4 rounded-pill" style={{width: "150px"}}>this actuality based on a local event. <button className='m-2 pt-1 btn btn-secondary btn-sm rounded-pill' onClick={()=>checkEvent(event.id)}>check for this event</button></span>
                  </>
                  :
                  <>
                              <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="title" name='title' value={title} disabled onChange={e=>{setTitle(e.target.value)}} className="form-control form-control-lg" />
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
                  disabled
                />
              </FloatingLabel>
                  </>
                }
                <Row className='my-2'>
                    <Col className='m-2'>
                         <label htmlFor="startdate">starting date of actuality : </label> <small className='t-black fw-bold rounded-lg bg-yellow p-2 m-2'>{moment(startAt).format('YYYY-MM-DD')}</small> 
                     </Col> 
                </Row>
                <Row className='my-2'>
                    <Col className='m-2'>
                         <label htmlFor="startdate">ending date of actuality : </label> <small className='t-black fw-bold rounded-lg bg-yellow p-2 m-2'>{moment(endAt).format('YYYY-MM-DD')}</small> 
                     </Col> 
                </Row>
                <Row>

                </Row>

                <div className="mt-5  pb-2">
                  <div className="form-outline form-white fw-bold">
                  <Button className='btn btn-success' onClick={()=>_editActuality()} >Edit</Button>
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

export default DetailsActuality