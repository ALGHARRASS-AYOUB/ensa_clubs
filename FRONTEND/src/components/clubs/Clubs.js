import { useEffect, useReducer, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useClub } from '../../context/ClubContext';
import ClubsGroupCards from './ClubsGroupCards';


function Clubs() {
  const navigate = useNavigate('');
  const { getAll,getVerifiedClubs,getSuspendedClubs }=useClub()
  const [clubs, setClubs] = useState([]);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [filtredData, setFiltredData] = useState([]);
  const [reducer,forceUpdate]=useReducer(x=>x+1,0)
  const [filter,setFilter]=useState('all')

  const fetchData = async () => {
    const _clubs = await getAll();
    setClubs(_clubs?.data.data);
    // console.log('clubs fetched',_clubs?.data.data)
    // setFiltredData(clubs?.data.data);
  };
  const updateGroupCards =async (v=null,searchKey=null) => {
    if (searchKey == null && v != null) {
      setFilter(v)
      switch (v) {
        case 'verified':
          const data=await getVerifiedClubs(1)
          console.log(v,data)
          setClubs(data?.data.data)
          break;

          case 'not_verified':
            const datanotVerf=await getVerifiedClubs(0)
            console.log(v,datanotVerf)
            setClubs(datanotVerf?.data.data)
            break;

        case 'suspended':
          const suspended=await getSuspendedClubs(1)
          console.log(v,suspended)
          setClubs(suspended?.data.data)
          break;
          
        case 'not_suspended':
          const notSusp=await getSuspendedClubs(0)
          console.log(v,notSusp)
          setClubs(notSusp?.data.data)
          break;
        case 'all':
          const _clubs=await getAll()
          setClubs(_clubs?.data.data);
          break;
        default:
          break;
      }
      setFiltredData(clubs)
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
      console.log('render Clubs')

      setUserInfo(JSON.parse(localStorage.getItem('userinfo')).data);
        } else {
      return navigate('/login');
    }
    setFiltredData(clubs)
    // forceUpdate()
  }, [localStorage.getItem('userinfo'),clubs,filter]);

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