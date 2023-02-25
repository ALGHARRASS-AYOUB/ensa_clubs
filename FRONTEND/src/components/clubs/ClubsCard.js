import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useClub } from '../../context/ClubContext';


const ClubsCard = ({club,setClubs}) => {
    const {getAll,verifyOrNotClub,suspendedOrNotClub,isLoding,setLoading}=useClub()
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
      
  
      setShow(true);
    };

    const _suspendedOrNotClub = async id => {
        await suspendedOrNotClub(id);
        const clubs = await getAll();
        setClubs(clubs?.data.data);
      };
    
      const _verifyOrNotClub = async (id) => {
        const club=await verifyOrNotClub(id);
        const clubs = await getAll();
        setClubs(clubs?.data.data);
      };

      const editClub=(id)=>{
        
      }

      const deleteClub=(id)=>{

      }

      useEffect(()=>{
        console.log('a change ')
        
      },[club])


  return (
    
    <Card>
        <Card.Header>
         {club.name}
         {club.verified == 1
                            ?  <i className='mx-3 fa fa-check-circle '></i>
                            : <span className=' mx-4 fw-bold'>not verified</span>}
   
        </Card.Header>
    <Card.Img variant="top" src={club.logo}  />
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

      <hr />
      <button
                          className='btn btn-fill btn-info me-2'
                          onClick={() => _verifyOrNotClub(club.id)}
                        >
                          {club.verified == 1
                            ? 'unverify this club'
                            : 'verify this club'}
                        </button>
                        <button
                          className='btn btn-fill btn-success me-2'
                          onClick={() => _suspendedOrNotClub(club.id)}
                        >
                        
                          {club.suspended ==1
                            ? 'unsuspend this club'
                            : 'suspend this club'}
                        </button>
                        <button
                          className='btn btn-fill btn-secondary me-2'
                          onClick={() => editClub(club.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => deleteClub(club.id)}
                        >
                          Delete
                        </button>

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

export default ClubsCard