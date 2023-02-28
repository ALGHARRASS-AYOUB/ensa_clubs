
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useClub } from '../../context/ClubContext';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { Badge, Button, Container } from 'react-bootstrap';

const MyClub = () => {
    const navigate = useNavigate();
    const {getClubOfAuthenticatedUser}=useClub('')
    const [file,setFile]=useState(null)

  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [club,setClub]=useState([])


  const fetchClub=async()=>{
    const _club=await getClubOfAuthenticatedUser();
    console.log('club in my club',_club)
    setClub(_club?.data.data)
    const url='http://localhost:80'
    setFile(url+club?.bureauMembersFile)

  }

    useEffect(()=>{
        fetchClub()
    },[localStorage.getItem('userinfo')])
    const editClub=(id)=>{
        navigate('/president/editMyclub')
    }

    const deleteClub=(id)=>{

    }

    
    return (
    
    <Container>
            <Card>
            <Card.Header>
             {club.name}
             {club.verified == 1
                                ?  <i className='mx-3 fa fa-check-circle '></i>
                                : <span className=' mx-4 fw-bold'>not verified</span>}
       
            </Card.Header>
        <Card.Img variant="top" src={club.logo}  style={{ 'maxWidth':'20rem','maxHeight':'60rem','borderRadius':'100%' }} />
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
                {userInfo?.firstName }  {userInfo?.lastName}
                
            </Card.Text>
            <small>president email: {userInfo?.email}</small>

            <hr/>
            <Card.Text>
                <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>supervisor </span>
                {club.supervisor == null ? 'none' : club.supervisor}
                
            </Card.Text>

            <hr/>
            <Card.Text>
            <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>description </span>
                <p className=''> {club.description}</p>
                
            </Card.Text>
        
          <hr />
          <td>{club?.verified == 1 ? <Badge  pill bg="success">Verified  <i className='mx-3 fa fa-check-circle '></i> </Badge>:<Badge pill  bg="danger">Not Verified <i className='mx-3 fa fa-times-circle '></i></Badge>}</td>
                      <td>{club?.suspended == 1 ? <Badge  pill bg="danger"> <i className='mx-3 fa fa-times-circle '></i></Badge>:<Badge pill  bg="info">not suspended <i className='mx-3 fa fa-check-circle '></i></Badge>}</td>
                   
                     <td> <a href={file} className='p-2 m-2 bg-blue rounded-lg'>download exuctif members file </a></td>
                
                      <hr />
                    
                  
                            <button
                              className='btn btn-fill btn-secondary me-2'
                              onClick={() => editClub(club.id)}
                            >
                              Edit My Club
                            </button>
                            <button
                              className='btn btn-fill btn-danger'
                              onClick={() => deleteClub(club.id)}
                            >
                              Delete My club
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
    </Container>
      )
}

export default MyClub