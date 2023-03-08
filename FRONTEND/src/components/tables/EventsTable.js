import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap components
import { Card, Table, Row, Col, Container, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';


function EventTable({ events,setEvents}) {
  const navigate = useNavigate();
  const { setLoading,loading,getEvents,show,store,deleteEvent,ApprouveOrNotEvent } = useEvent('')
  const [approuved,setApprouved]=useState()
  const [eventsToMap,setEventsToMap]=useState()
//   const { addUserToFavoriteList, removeUserFromFavoriteList } = useFav('');
//   const { addUserToBlackList, removeUserFromBlackList } = useBlack('');


  
 const fetch=async()=>{
    const events = await getEvents();
    setEvents(events?.data.data)
    setEventsToMap(events?.data.data)
 }

 function detailsEvent(id) {

  return navigate('/admin/events/DetailsEvent', {
    state: {
      id: id,
    },
  });
}

function createActuality(id) {

  return navigate('/admin/actualities/actualitiesForEvent', {
    state: {
      id: id,
    },
  });
}


function editEvent(id) {

  return navigate('/admin/events/editEvent', {
    state: {
      id: id,
    },
  });
}

  async function _deleteEvent(id) {
    const data = await deleteEvent(id);
    if (data != null) {
      toast.success('event Deleted');
    }
    const res = await getEvents()
    setEvents(res?.data.data)

  }
  

  const _changeApprouvment= async id => {
    const event=await ApprouveOrNotEvent(id);
    setApprouved(event?.data.data);
    fetch()
  };



  useEffect(()=>{
    console.log('approuved ??',    approuved)
    fetch()
  },[approuved])


  return (
    <Container>
      <Row>
        <ToastContainer />
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Events</Card.Title>
              {loading && <Spinner animation='grow' />}
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover '>
                <thead>
                  <tr>
                    <th className='border-0'>Image</th>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>name</th>
                    <th className='border-0'>description</th>
                    <th className='border-0'>Approuved ? </th>
                    <th className='border-0'>of club</th>
                    <th className='border-0'>salles</th>
                    <th className='border-0'>event date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.map(event => (
                    <tr key={event.id}>
                      <td><img src={event.image} style={{ 'borderRadius':'50%' ,'maxWidth':'10rem','maxHeight':'10rem'}} /></td>
                      <td>{event.id}</td>
                      <td>{event.name}</td>
           
                      <td>{event.descreption}</td>
                      <td>{event.isApprouved == 1 ? <Badge  pill bg="success">Approuved</Badge>:<Badge pill  bg="danger">Not Approuved</Badge>}</td>
                      <td>{event.club.name}</td>
                      <td style={{ 'maxWidth':'10rem' }}>{event?.salles.map((salle)=><Badge pill bg="light" text="dark" >{salle.name}</Badge>)}</td>
                      <td>{moment(event.dateEvent).format('DD-MM-YYYY')}</td>
                      <td>
                        <Button variant="secondary" size="sm" className='m-1'
                            onClick={() => _changeApprouvment(event.id)}
                            >
                    {event.isApprouved == 1
                          ? <span>UnApprouve <i className='ms-3 fa fa-times-circle ' style={{ 'color':'red' }}></i></span>
                           : <span> Approuve <i className='ms-3 fa fa-check-circle ' style={{ 'color':'green' }}></i></span>}
            </Button>
                      
                    <button
                          className='btn btn-fill btn-primary mx-1'
                          onClick={() => detailsEvent(event.id)}
                          ><span><i className='fa fa-info-circle'></i></span> 
                   </button>   
                        <button
                          className='btn btn-fill btn-success mx-1'
                          onClick={() => editEvent(event.id)}
                        >
                         <span><i className='fa fa-wrench'></i></span> 
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => _deleteEvent(event.id)}
                        >
                          <span><i className='fa fa-trash'></i></span> 
                        </button>
                        
                        {
                          event.isApprouved==1 &&
                          <button
                          title='create an actuality for this event'
                            className='btn m-1 btn-sm btn-secondary'
                            onClick={() => createActuality(event.id)}
                          ><small>create actuality</small>
                            <span><i className='ms-2 fa fa-newspaper'></i></span> 
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventTable;