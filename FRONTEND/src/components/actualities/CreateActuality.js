import moment, { now } from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownButton, Dropdown ,FloatingLabel, Form, ListGroup, Row, Col } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEvent } from '../../context/EventContext'
import { useActuality } from '../../context/ActualityContext'
import { useSalle,isLoading } from '../../context/SalleContext'

const CreateActuality = () => {
const {store}=useActuality('')
const [title,setTitle]=useState()
const [startAt,setStartAt]=useState()
const [endAt,setEndAt]=useState()
const [body,setBody]=useState()
const [image,setImage]=useState(null)

const navigate=useNavigate()


const handleSubmit=(e)=>{
  e.preventDefault()
  console.log('info',(title,body,startAt,endAt,image))
  storeActuality();
}






const storeActuality=async()=>{

  const _actuality=await store(title,body,startAt,endAt,image);
  console.log('res update',_actuality)
  if(_actuality?.data.data){
    
    toast.success('the actuality has been created')
    setTitle(_actuality?.data.data.title)
    setBody(_actuality?.data.data.body)
    navigate('/admin/actualities')
  }else{
    toast.error(_actuality)
  }
}

useEffect(()=>{

},[title,body,image,startAt,endAt])





  return (
   
            <Container className='m-5'>
              
            <h3 className="fw-normal mb-5">Create new Actuality</h3>
            <hr />
  
              { 
              <Form onSubmit={e=>handleSubmit(e)} encType={'multipart/form-data'}>
                             <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input type="text" id="title" name='title' onChange={e=>{setTitle(e.target.value)}} className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="title">title</label>
                  </div>
                </div>

                <FloatingLabel controlId="floatingTextarea2" className='py-2 mb-4' label="Description">
                <Form.Control
                name='body'
                className=''
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: '100px' }}
                  onChange={e=>{setBody(e.target.value)}}
                />
              </FloatingLabel>
    

                <Row className='my-2'>
                  <Col className='m-2'>
                  <label htmlFor="startdate">starting date : </label><Form.Control format='Y-m-d H:i:s'   type='Date'   name='startAt' min={moment(Date.now()).format("YYYY-MM-DD") }    onChange={e=>{setStartAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} }    />
                  </Col>
                  <Col className='m-2'>
                  <label htmlFor="enddate">ending date : </label><Form.Control type='Date' format='Y-m-d H:i:s'  min={moment(Date.now()).format("YYYY-MM-DD") }  onChange={e=>setEndAt(moment(e.target.value).format('YYYY-MM-DD HH:mm:ss'))} />
                  </Col>
                </Row>
                <Row>
                <div className="my-4">
                  <div className="form-outline form-white">
                    <input type="file" name='image'  id="image" className="form-control form-control-lg"  onChange={e=>{setImage(e.target.files[0])}}  />
                    <label className="form-label" htmlFor="image">upload the Image of event</label>
                  </div>
                </div>
                </Row>

                <div className="mt-5  pb-2">
                  <div className="form-outline form-white fw-bold">
                  <Button className='btn btn-success' type='submit'  >SUBMIT</Button>
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

export default CreateActuality