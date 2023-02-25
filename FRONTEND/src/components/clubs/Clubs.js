import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useClub } from '../../context/ClubContext';
import ClubsGroupCards from './ClubsGroupCards';


function Clubs() {
  const navigate = useNavigate('');
  const { getAll }=useClub()
  const [clubs, setClubs] = useState([]);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const clubs = await getAll();
  
    setClubs(clubs?.data.data);
    setFiltredData(clubs?.data.data);
  };
  const updateGroupCards = (v=null,searchKey=null) => {
    if (searchKey == null && v != null) {
      let data=null;
      switch (v) {
        case 'verified':
           data = clubs.filter(item => {
            return item.verified=="1";
          });
          setFiltredData(data);
          console.log(data);
          break;

          case 'not_verified':
             data = clubs.filter(item => {
              return item.verified!="1";
            });
            setFiltredData(data);
            console.log(data);
            break;

        case 'suspended':
          setFiltredData(
            clubs.filter(item => {
              return item.suspended == "1";
            }),
          );
          break;
          
        case 'not_suspended':
          setFiltredData(
            clubs.filter(item => {
              return item.suspended != "1";
            }),
          );
          break;
        case 'all':
          setFiltredData(clubs);
          break;
        default:
          break;
      }
    }

    if (searchKey != null && v == null) {
      const data = clubs.filter(item => {
        return item.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };
  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      console.log('Clubs',clubs)
      console.log('Clubs',userInfo)
      setUserInfo(JSON.parse(localStorage.getItem('userinfo')).data);
        } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userinfo')]);

  return (
    <Container>
      <Row className='mb-4'>
        <Col md='6'>
          <Form.Select onChange={e => updateGroupCards(e.target.value)}>
            <option value={'all'}>All</option>
            <option value={'verified'}>verified</option>
            <option value={'not_verified'}>Not verified</option>
            
            <option value={'suspended'}>suspended</option>
            <option value={'not_suspended'}>Not suspended</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search Club'
            aria-label='Search Club'
            aria-describedby='basic-addon2'
            onChange={e => updateGroupCards(null, e.target.value)}
          />
        </Col>
      </Row>
      <ClubsGroupCards clubs={filtredData} setClubs={setClubs} />
    </Container>
  );
}
export default Clubs;