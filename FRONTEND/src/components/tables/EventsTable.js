import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap components
import { Card, Table, Row, Col, Container, Button } from 'react-bootstrap';
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

  function editEvent(id) {

    return navigate('/admin/profile', {
      state: {
        userId: id,
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
                      <td>{event.isApprouved}</td>
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
                          className='btn btn-fill btn-secondary me-2'
                          onClick={() => editEvent(event.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => _deleteEvent(event.id)}
                        >
                          Delete
                        </button>
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