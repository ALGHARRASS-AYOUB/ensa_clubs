import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

// react-bootstrap components
import { Card, Table, Row, Col, Modal, Button, Form, Container } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClub } from '../../context/ClubContext';
import CardGroup from 'react-bootstrap/CardGroup';




function ClubsGroupCards({ clubs, setClubs }) {
  const navigate = useNavigate();
  const {getAll,verifyOrNotClub,suspendedOrNotClub,getVerifiedAndNotSuspendedClubs,isLoding,setLoading}=useClub('')
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [show, setShow] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [verfiedClub,setVerifiedClub]=useState()
  const [suspendedClub,setSuspendedClub]=useState()
  const [clubsToMap,setClubsToMap]=useState(clubs)
  const [choosenClub,setChoosenClub]=useState()


 const fetch=async()=>{


  if(userInfo.role=='admin'){
    const clubs = await getAll();
    setClubs(clubs?.data.data)
    setClubsToMap(clubs?.data.data);
  }else{
    const clubs = await getVerifiedAndNotSuspendedClubs();
    setClubs(clubs?.data.data)
    setClubsToMap(clubs?.data.data);
  }
 }


  const _suspendedOrNotClub = async id => {
    const club=await suspendedOrNotClub(id);
    setVerifiedClub(club?.data.data);
    fetch()
  };

  const _verifyOrNotClub = async id => {
    const club=await verifyOrNotClub(id);
    setVerifiedClub(club?.data.data);
    fetch()
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true)
  
    // setChoosenClub(club)
     
  };
//   const { addCar, deleteCar, getOwnerCars } = useCar('');

//   const exec = async (action, deleteId = null) => {
//     if (action === 'addCar') {
//       if (userInfo != null) {
//         console.log(form);
//         const res = await addCar(form);
//         console.log(res);
//         const cars = await getOwnerCars(userInfo.id);
//         setCars(cars.value);
//         handleClose();
//       } else {
//         return navigate('/login');
//       }
//     }
//     if (action === 'deleteCar') {
//       if (userInfo != null) {
//         confirmAlert({
//           message: 'Are you sure to do this.',
//           buttons: [
//             {
//               label: 'Yes',
//               onClick: async () => {
//                 const res = await deleteCar(deleteId);
//                 const marques = await getOwnerCars(userInfo.id);
//                 setCars(marques.value);
//               },
//             },
//             {
//               label: 'No',
//             },
//           ],
//         });
//       } else {
//         return navigate('/login');
//       }
//     }
//   };
 // var photo;
//   const uploadImage = async e => {
//     photo = e.target.files[0];
//     const formData = new FormData();
//     formData.append('imageFile', photo);

//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     };
//     const uploadPath = getUrl('upload');
//     setAllowSubmit(false);
//     const { data } = await axios.post(
//       `${uploadPath}/UploadSingle`,
//       formData,
//       config,
//     );
//     setAllowSubmit(true);

//     console.log(data);
//     setForm({ ...form, photo: data.imageUrl });
//   };


const ClubDetails=()=> {
  console.log('show in details  ',show)
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose()}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function editClub(id) {
  // navigate(`/clubDetails`, {
  //   state: {
  //     carId: id,
  //   },
  // });
  console.log('want to edit club ??')
}


  const deleteClub=(id)=>{

  }

/******** club card ********** */
const ClubsCard = ({club}) => {


  return (
    <Card>
        <Card.Header>
         {club.name}
         {club.verified == 1
                            ?  <i className='mx-3 fa fa-check-circle '></i>
                            : <span className=' mx-4 fw-bold'>not verified</span>}
   
        </Card.Header>
         <Card.Img variant="top" src={club.logo} style={{ 'maxHeight':'25rem',borderRadius:'50%' }} />
          <Card.Body>
            <Card.Title>   <span className='fs-6 fw-bold bg-orange p-1 pe-3 rounded-lg mr-2'> slugon </span>{club.slugon} <br /><br/></Card.Title>  
            <Card.Text>
                <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'> domain activity </span>
                {club.activityDomaine}
            </Card.Text>
            <hr/>
            <Card.Text>
                <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>email </span>
                {club.email}
            </Card.Text>
            <hr/>
            <Card.Text>
                <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>president </span>
                {club.president.firstName }  {club.president.lastName}

      
                
            </Card.Text>
            <small>president email: {club.president.email}</small>
            <hr/>
            <Card.Text>
                <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>supervisor </span>
                {club.supervisor == null ? 'none' : club.supervisor}
                
            </Card.Text>
      
            {
              userInfo?.role=='admin' ?
            <>
              <hr />
              <Button variant="secondary" size="sm" className='m-1'
                   onClick={() => _verifyOrNotClub(club.id)}
                   >
                      {club.verified == 1
                            ? <span>Unverify this club <i className='ms-3 fa fa-times-circle ' style={{ 'color':'red' }}></i></span>
                             : <span>Verify this club <i className='ms-3 fa fa-check-circle ' style={{ 'color':'green' }}></i></span>}
              </Button>
              <Button variant="secondary" size="sm" className='m-1'
                   onClick={() => _suspendedOrNotClub(club.id)}
                   >
                      {club.suspended == 1
                            ? <span>Unsuspended this club <i className='ms-3 fa fa-smile ' style={{ 'color':'white' }}></i></span>
                             : <span>Suspend this club <i className='ms-3  fa fa-frown  ' style={{ 'color':'white' }}></i></span>}
              </Button>
              <Button variant="success" size="sm" className='m-1'
                   onClick={() => editClub(club.id)}
                   ><span><i className='fa fa-wrench'></i></span>   
              </Button>
              <Button variant="danger" size="sm" className='m-1'
                   onClick={() => deleteClub(club.id)}
                   ><span><i className='fa fa-trash'></i></span>   
              </Button></>
              :<></>
            }
            <hr />
            <Button variant="info" onClick={handleShow()}>
                      Details
            </Button>
                   <br />
            </Card.Body>
    <Card.Footer>
      <small className="text-muted">created at :   {moment(club.createdAt).format('DD-MM-YYYY')}</small>
      <br />
      <small className="text-muted">suspended at :   {moment(club.suspendedAt).format('DD-MM-YYYY')}</small>
      <br />
      <small className="text-muted">verfied at :   {moment(club.verifiedAt).format('DD-MM-YYYY')}</small>
    </Card.Footer>
  </Card>
  )
}
// ******************************
useEffect(() => {
    console.log('clubs group card rendered show',show)
 
    fetch()
  },[verfiedClub,suspendedClub ]);


return  (
  <>
    <Container>
  <CardGroup className='m-4'>
      <Row xs={1} md={2} className="g-4">
          {clubs?.map((club)=>{
          return<Col id={club.id} key={club.id}> <ClubsCard key={club.id} club={club} /></Col>
          })}
      </Row>
  </CardGroup>
</Container>
  </>

)

//     <Container>
//       <Row>
//         <ToastContainer />
//         <Col md='12'>
//           <Card className='strpied-tabled-with-hover'>
//             <Card.Header>
//               <Card.Title as='h4'>Clubs</Card.Title>
//             </Card.Header>
//             <Card.Body className='table-full-width table-responsive px-0'>
//               <Table className='table-hover table-striped'>
//                 <thead>
//                   <tr>
//                     <th className='border-0'>ID</th>
//                     {type === 'admin' ? (
//                       <th className='border-0'>Owner</th>
//                     ) : null}
//                     <th className='border-0'>name</th>
//                     <th className='border-0'>brand</th>
//                     <th className='border-0'>prix</th>
//                     <th className='border-0'>Added Date</th>
//                     <th className='border-0'>Status</th>
//                     <th className='border-0'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {clubs?.map((item, ind) => {
//                     return (
//                       <tr key={ind}>
//                         <td>{item.id}</td>
//                         {type === 'admin' ? (
//                           <td>{item.user.username}</td>
//                         ) : null}
//                         <td>{item?.name}</td>
//                         <td>{item?.marque.libelle}</td>
//                         <td>{item?.prix + ' DH'}</td>
//                         <td>{moment(item.dateAdded).format('DD-MM-YYYY')}</td>
//                         <td>
//                           {item?.isAprouved ? 'Approuved' : 'Not Approuved'}
//                         </td>
//                         <td>
//                           {type === 'admin' ? (
//                             <button
//                               className='btn btn-fill btn-primary me-2'
//                               onClick={() => approveVoiture(item.id)}
//                               disabled={item.isAprouved}
//                             >
//                               Approve
//                             </button>
//                           ) : null}
//                           <button
//                             className='btn btn-fill btn-secondary me-2'
//                             onClick={() => editCar(item.id)}
//                           >
//                             Edit
//                           </button>
//                           {type === 'owner' ? (
//                             <button
//                               className='btn btn-fill btn-danger'
//                               onClick={() => exec('deleteCar', item.id)}
//                             >
//                               Delete
//                             </button>
//                           ) : null}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </Card.Body>
//             {type === 'owner' ? (
//               <Card.Footer style={{ textAlign: 'center' }}>
//                 <button
//                   className='btn btn-fill btn-primary'
//                   onClick={handleShow}
//                 >
//                   Add Car
//                 </button>
//               </Card.Footer>
//             ) : null}
//           </Card>
//         </Col>
//       </Row>
//       {type === 'owner' ? (
//         <Modal
//           show={show}
//           onHide={handleClose}
//           backdrop='static'
//           keyboard={false}
//         >
//           <Form>
//             <Modal.Header>
//               <Modal.Title style={{ margin: 'unset' }}></Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Row className='pb-3'>
//                 <Col className='pl-1' md='6'>
//                   <Form.Group>
//                     <Form.Control
//                       placeholder='Name'
//                       type='text'
//                       value={form.name}
//                       onChange={e => setForm({ ...form, name: e.target.value })}
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col className='pr-1'>
//                   <Form.Group>
//                     <Form.Control
//                       placeholder='Price (DH)'
//                       type='text'
//                       value={form.prix}
//                       onChange={e => setForm({ ...form, prix: e.target.value })}
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className='pb-3'>
//                 <Col className='pr-1' md='6'>
//                   <Form.Group>
//                     <Form.Select
//                       value={form.couleur}
//                       onChange={e =>
//                         setForm({ ...form, couleur: e.target.value })
//                       }
//                     >
//                       <option>Select Couleur</option>
//                       <option value={'red'}>Red</option>
//                       <option value={'gray'}>Gray</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col className='pr-1' md='6'>
//                   <Form.Group>
//                     <Form.Select
//                       value={form.marqueId}
//                       onChange={e =>
//                         setForm({ ...form, marqueId: e.target.value })
//                       }
//                     >
//                       <option>Select Brand</option>
//                       {brands?.map((item, ind) => {
//                         return (
//                           <option value={item.id} key={ind}>
//                             {item.libelle}
//                           </option>
//                         );
//                       })}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className='pb-3'>
//                 <Col md='6'>
//                   <Form.Group>
//                     <Form.Control
//                       value={form.km}
//                       onChange={e => setForm({ ...form, km: e.target.value })}
//                       placeholder='Distance(KM)'
//                       type='text'
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col className='pl-1' md='6'>
//                   <Form.Group>
//                     <Form.Control
//                       placeholder='Year (ex: 2018)'
//                       type='text'
//                       value={form.anne}
//                       onChange={e => setForm({ ...form, anne: e.target.value })}
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className='pb-2'>
//                 <Col md='12'>
//                   <Form.Group>
//                     <textarea
//                       className='form-control'
//                       placeholder='Description'
//                       value={form.desc}
//                       onChange={e => setForm({ ...form, desc: e.target.value })}
//                     ></textarea>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className='pb-2'>
//                 <Col md='12'>
//                   <Form.Group>
//                     <Form.Control
//                       type='file'
//                       accept='image/*'
//                       onChange={uploadImage}
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Modal.Body>
//             <Modal.Footer>
//               <button
//                 className='btn btn-fill btn-secondary'
//                 onClick={handleClose}
//                 type='reset'
//               >
//                 Close
//               </button>
//               {allowSubmit ? (
//                 <button
//                   className='btn btn-fill btn-primary'
//                   type='button'
//                   onClick={() => exec('addCar')}
//                 >
//                   Add Car
//                 </button>
//               ) : (
//                 <button
//                   className='btn btn-fill btn-primary'
//                   type='button'
//                   onClick={() => exec('addCar')}
//                   disabled
//                 >
//                   Add Car
//                 </button>
//               )}
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       ) : null}
//     </Container>
//   );
}

export default ClubsGroupCards;