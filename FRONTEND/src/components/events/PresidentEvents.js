import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import PresidentEventTable from '../tables/PresidentEventTable';


function PresidentEvents() {

  const navigate = useNavigate('');
  const { isLoading,setLoading,getMyEvents,getApprouvedMyEvents,show,store,deleteEvent,ApprouveOrNotEvent  } = useEvent('');
  const [events, setEvents] = useState([]);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [filtredData, setFiltredData] = useState([]);
  const [filter,setFilter]=useState('all')
  
  const fetchData = async () => {
  
      const _events = await getMyEvents();
      setEvents(_events?.data.data);
    //setFiltredData(_events?.data.data);
  };

  const updateTable = async(v = null, searchKey = null) => {
    
    if (v != null && searchKey == null) {
    setFilter(v)
      switch (v) {
        case 'approuved':
          const approuvedEvents=await getApprouvedMyEvents(1)
          setEvents(approuvedEvents?.data.data)
          break;
        case 'not_approuved':
          const notApprouvedEvents=await getApprouvedMyEvents(0)
          setEvents(notApprouvedEvents?.data.data)
          break;
        case 'all':
          
            const _events = await getMyEvents();
            setEvents(_events?.data.data);
        
          break;
        default:
          break;
      }
      setFiltredData(events)
    }
    
    if(searchKey != null && v == null){
      const data = events.filter(item => {
        return item.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };

  useEffect(() => {
    if (userInfo != null) {
      setUserInfo(JSON.parse(localStorage.getItem('userinfo')).data);
    } else {
      return navigate('/login');
    }
    setFiltredData(events)
  }, [localStorage.getItem('userinfo'),events,filter]);
  return (
    
    <Container>
            <h1 className='p-2 mt-2' style={{  borderBottom: '3px solid #365b81' }}><i className='mx-1 fa fa-calendar-o'></i> events </h1>

      <Row className='m-4'>
        <Col md='6'>
          <Form.Select
            aria-label='event filtring'
            onChange={e => updateTable(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='approuved'>approuved</option>
            <option value='not_approuved'>not approuved</option>

          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search event'
            aria-label='Search event'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <Row className='mx-1 my-4'>
        <Col>
        { userInfo?.role=='president' &&
          <Button variant="primary" size="lg" className='text-white fw-bold ' href='/president/events/createEvent'>
          add an event <i className='mx-3 fa fa-plus-square '></i>
      </Button>
        }
      
        </Col>
      </Row>
      
      <PresidentEventTable events={filtredData} setEvents={setEvents} />
    </Container>
  );
}
export default PresidentEvents;