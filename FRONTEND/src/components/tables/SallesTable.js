import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap components
import { Card, Table, Row, Col, Container, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSalle } from '../../context/SalleContext';
// import { useFav } from '../../Context/FavListContext';
// import { useBlack } from '../../Context/BlackListContext';

function SallesTable({ salles,setSalles}) {
  const navigate = useNavigate();
  const { getSalles,show,changeDiponibilitySalle,updateSalleByAdmin,deleteSalleByAdmin,loading } = useSalle('');
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [disponible,setDisponible]=useState()
  const [sallesToMap,setSallesToMap]=useState()

  
 const fetch=async()=>{
    const salles = await getSalles();
    setSalles(salles?.data.data)
    setSallesToMap(salles?.data.data)
 }

  function editSalle(id) {

    return navigate('/admin/salles/editSalle/', {
      state: {
        id: id,
      },
    });
  }

  async function deleteSalle(id) {
    const data = await deleteSalleByAdmin(id);
    if (data != null) {
      toast.success('Salle Deleted');
    }
    const res = await getSalles()
    setSalles(res?.data.data)

  }
  

  const _changeDispobibility = async id => {
    const salle=await changeDiponibilitySalle(id);
    setDisponible(salle?.data.data);
    fetch()
  };

  useEffect(()=>{
    console.log('dispo',disponible)
    fetch()
  },[disponible])


  return (
    <Container>
      <Row>
        <ToastContainer />
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Salles</Card.Title>
              {loading && <Spinner animation='grow' />}
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover '>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>name</th>
                    <th className='border-0'>Disponible ?</th>
                    <th className='border-0'>Reserved ?</th>
                    <th className='border-0'>created at</th>
                    {userInfo?.role == 'admin'?<th>Actions</th>:<></>}
                  </tr>
                </thead>
                <tbody>
                  {salles?.map(salle => (
                    <tr key={salle.id}>
                      <td>{salle.id}</td>
                      <td>{salle.name}</td>
           
                      <td>{salle.isDisponible == 1 ? <Badge  pill bg="success">Disponible</Badge>:<Badge pill  bg="danger">Not Disponible</Badge>}</td>
                      <td>{salle.isReserved == 1 ? <Badge  pill bg="success">Reserved</Badge>:<Badge pill  bg="danger">Not Reserved</Badge>}</td>
                      
                      <td>{moment(salle.createdAt).format('DD-MM-YYYY')}</td>
                {
                  userInfo?.role == 'admin' ?
                      <td>
                  <Button variant="secondary" size="sm" className='m-1'
                  onClick={() => _changeDispobibility(salle.id)}
                  >
          {salle.isDisponible == 1
                ? <span>Make Not Disponible <i className='ms-3 fa fa-times-circle ' style={{ 'color':'red' }}></i></span>
                 : <span> Make Disponible <i className='ms-3 fa fa-check-circle ' style={{ 'color':'green' }}></i></span>}
             </Button>
        
                        <button
                          className='btn btn-fill btn-secondary me-2'
                          onClick={() => editSalle(salle.id)}
                          >
                          Edit
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => deleteSalle(salle.id)}
                          >
                          Delete
                        </button>
                      </td>
                          : <></>
                        }
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

export default SallesTable;