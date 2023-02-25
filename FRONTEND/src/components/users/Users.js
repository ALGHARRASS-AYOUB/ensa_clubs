import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import UsersTable from '../tables/UsersTable';


function Users() {

  const navigate = useNavigate('');
  const { getUsers } = useUser('');
  const [users, setUsers] = useState([]);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const users = await getUsers();
    console.log('users',users.data.data)
    setUsers(users?.data.data);
    setFiltredData(users?.data.data);
  };

  const updateTable = (v = null, searchKey = null) => {
    if (v != null && searchKey == null) {
      // switch (v) {
      //   case 'favorite':
      //     const data = users.filter(item => {
      //       return item.favoriteList != null;
      //     });
      //     console.log(data);
      //     setFiltredData(data);
      //     break;
      //   case 'baned':
      //     setFiltredData(
      //       users.filter(item => {
      //         return item.blacklist != null;
      //       }),
      //     );
      //     break;
      //   case 'all':
      //     setFiltredData(users);
      //     break;
      //   default:
      //     break;
      // }
      setFiltredData(users)
    }
    if(searchKey != null && v == null){
      const data = users.filter(item => {
        return item.firstName.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };

  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      setUserInfo(JSON.parse(localStorage.getItem('userinfo')).data);
    } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userinfo')]);
  return (
    
    <Container>
      <Row className='m-4'>
        <Col md='6'>
          <Form.Select
            aria-label='User Type'
            onChange={e => updateTable(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='favorite'>Favorite Users</option>
            <option value='baned'>Baned Users</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search User'
            aria-label='Search User'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <UsersTable users={filtredData} setUsers={setUsers} />
    </Container>
  );
}
export default Users;