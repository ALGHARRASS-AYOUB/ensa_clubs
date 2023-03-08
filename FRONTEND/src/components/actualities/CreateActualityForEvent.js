import moment, { now } from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownButton, Dropdown ,FloatingLabel, Form, ListGroup, Row, Col, Badge } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEvent } from '../../context/EventContext'
import { useSalle,isLoading } from '../../context/SalleContext'
import { useActuality } from '../../context/ActualityContext'


const CreateActualityForEvent = ({id}) => {
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
const {update,show}=useEvent('')
const {store}=useActuality('')
const [event,setEvent]=useState()
const [name,setName]=useState()
const [startAt,setStartAt]=useState()


const [actualitystartAt,setActualityStartAt]=useState()
const [actualityendAt,setActualityEndAt]=useState()

const [description,setDescription]=useState()
const [image,setImage]=useState('')
const [Url,setUrl]=useState('http://localhost:80')
const [sallesOfEvent,setSallesOfEvent]=useState(null)
const navigate=useNavigate()



const fetchEvent=async()=>{
  const _event=await show(id);
  
  
  setEvent(_event)
  setName(_event?.data.data.name)
  setDescription(_event?.data.data.description)
  setStartAt(_event?.data.data.dateEvent)
  setSallesOfEvent(_event?.data.data.salles)
  setImage(_event?.data.data.image)
  console.log('img',_event?.data.data.image)
 
}

const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('info',(actualitystartAt,actualityendAt,id))
    storeActuality();
  }
  const storeActuality=async()=>{

    const _actuality=await store(null,null,actualitystartAt,actualityendAt,null,id);
    console.log('res update',_actuality)
    if(_actuality?.data.data){
      
      toast.success('the actuality has been updated')

      navigate('/admin/actualities')
    }else{
      toast.error(_actuality)
    }
  }  

function editEvent(id) {
  console.log('role',userInfo.role)
  let to=''
  if(userInfo.role=='admin')
     to='/admin/events/editEvent';
  else if(userInfo.role=='president')
     to='/president/events/editEvent';
  return navigate(to, {
    state: {
      id: id,
    },
  });
}


function salleDetails(id) {
  let to=''
  if(userInfo.role=='admin')
     to='/admin/salles/DetailsSalle';
  else if(userInfo.role=='president')
     to='/president/salles/DetailsSalle';
  return navigate(to, {
    state: {
      id: id,
    },
  });
}

useEffect(()=>{
  fetchEvent()
},[])





  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal "> Event Details/create actuality</h3>
            <hr />
    <div className='mb-5'></div>
              { event &&
                  <Form  >

             {image && 
                <div className="mb-4 pb-2">
                <img src={Url+image} alt="" style={{ 'borderRadius':'8rem','maxHeight':'30rem',maxWidth:'40rem' }} />
              </div>
             }

                <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="name" name='name' value={name} disabled className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="name">Name</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4 text-white' label="Description">
                <Form.Control
                name='description'
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  value={ description}
                  disabled
                />
              </FloatingLabel>
    
                <Row>
                  <Col>
                  <div className="mt-2 mb-5 pb-2">
                  <div className="form-outline form-white"><span className='fw-bold'>salles of event :  </span>
                  {sallesOfEvent && sallesOfEvent.map((salle)=><Badge className='fw-bold p-2 m-1' pill bg="dark"   ><a onClick={()=>salleDetails(salle.id)} style={{ 'textDecoration':'none','cursor':'pointer' }}>{salle.name}</a></Badge>)}
                  </div>
                </div>
                  </Col>
                </Row>
                <Row>
                <Col className='m-2'>
                  <label htmlFor="startdate">event date : </label> <small className='t-black fw-bold rounded-lg bg-yellow p-2 m-2'>{moment(startAt).format('YYYY-MM-DD')}</small> 
                  </Col> 
                </Row>

                <Row className='my-4'>
                   {
                  (event && event.isApprouved==1)? <Badge bg="success" text="white">Approuved <i className='mx-2 fa fa-check-circle'></i> </Badge>
                    :<Badge bg="danger" text="white">Not Approuved <i className='mx-2 fa fa-times-circle'></i> </Badge>
                }
                </Row>


          
              </Form>
              }

{ 
              <Form onSubmit={e=>handleSubmit(e)} >

                <Row className='my-2'>
                  <Col className='m-2'>
                  <label htmlFor="startdate">starting date for actuality : </label><Form.Control format='Y-m-d H:i:s'   type='Date'   name='startAt' min={moment(Date.now()).format("YYYY-MM-DD") }    onChange={e=>{setActualityStartAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} }    />
                  </Col>
                  <Col className='m-2'>
                  <label htmlFor="enddate">ending date  for actuality : </label><Form.Control type='Date' format='Y-m-d H:i:s' name='endAt' min={moment(Date.now()).format("YYYY-MM-DD") }  onChange={e=>setActualityEndAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} />
                  </Col>
                </Row>

                <Row>
                    <Col>
                <div className="mt-5  pb-2">
                  <div className="form-outline form-white fw-bold">
                  <Button className='btn btn-success' type='submit'  >SUBMIT</Button>
                  </div>
                </div>   
                    </Col>
                    <Col>
                    <div className="mt-5  pb-2">
                <button
                          className='btn btn-fill btn-success mx-2 sm'
                          onClick={() => editEvent(id)}
                          >Edit 
                          <span> <i className='mx-1 fa fa-wrench'></i></span> 
                        </button>
                </div>         
             
                <div className="my-2 ">
                  <div className="form-outline form-white">
                  <Link className='btn btn-secondary' to='/admin/actualities' ><i className='mx-1 fa fa-chevron-left'> go to actualities</i></Link>
                  </div>
                </div> 
                    </Col>
                </Row>

 
              </Form>
              }
  
      </Container>
          
  )
}

export default CreateActualityForEvent