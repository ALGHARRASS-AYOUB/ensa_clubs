import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSalle } from '../../context/SalleContext';
import SallesTable from '../tables/SallesTable';


function Salles() {

  const navigate = useNavigate('');
  const { getSalles,getSallesByReservedStatus,getSallesByDisponibility,getDispoAndNotReservedSalles } = useSalle('');
  const [salles, setSalles] = useState([]);
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [filtredData, setFiltredData] = useState([]);
  const [filter,setFilter]=useState('all')

  const fetchData = async () => {
    const _salles = await getSalles();
   // setSalles(_salles)
    //getSalles(salles?.data.data);
    // setFiltredData(salles?.data.data); 
  };

  const updateTable =async (v = null, searchKey = null) => {
    if (v != null && searchKey == null) {
      // fetchData()
      setFilter(v)
      switch (v) {
        case 'disponible' :
          // const data = salles.filter(item => {
          //   return item.isDisponible == 1;
          // });
          const data=await getSallesByDisponibility(1)
          console.log(v,data)
          setSalles(data?.data.data)
          //setFiltredData(data);
         
          break;
        case 'not_disponible':
          // const notDispData = salles.filter(item => {
          //   return item.isDisponible != 1;
          // });
          const datanotDispo=await getSallesByDisponibility(0)
          console.log(v,datanotDispo)
          setSalles(datanotDispo?.data.data)
     
          break;
          case 'reserved':
            const reserved=await getSallesByReservedStatus(1)
            setSalles(reserved?.data.data)
            break;
          case 'not_reserved':
            const notReserved=await getSallesByReservedStatus(0)
            setSalles(notReserved?.data.data)
            break;
            case 'dispo&notReserved':
              const res=await getDispoAndNotReservedSalles(0)
              setSalles(res?.data.data)
              break;
        case 'all':
        const _salles=await getSalles()
          setSalles(_salles?.data.data);
          break;
        default:
          break;
      }
      setFiltredData(salles)
    }
    if(searchKey != null && v == null){
      const data = salles.filter(item => {
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
    setFiltredData(salles)
  }, [localStorage.getItem('userinfo'),salles,filter]);
  return (
    
    <Container>
      <Row className='m-4'>
        <Col md='6'>
          <Form.Select
            aria-label='salle filtring'
            onChange={e => updateTable(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='disponible'>disponible</option>
            <option value='not_disponible'>not disponible</option>
            <option value='reserved'>reserved</option>
            <option value='not_reserved'>not reserved</option>
            <option value='dispo&notReserved'>disponible and not reserved</option>
            
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search Salle'
            aria-label='Search Salle'
            aria-describedby='basic-addon2'
            onChange={(e)=>updateTable(null,e.target.value)}
          />
        </Col>
      </Row>
      <SallesTable salles={filtredData} setSalles={setSalles} />
    </Container>
  );
}
export default Salles;