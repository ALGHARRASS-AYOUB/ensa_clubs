
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { Badge, Button, Container } from 'react-bootstrap';

const Profile = () => {

  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)


  const editProfile=()=>{

  }

  return (
    <Container>
    <Card>
    <Card.Header>
  Profile User

    </Card.Header>
<Card.Body>


  <Card.Title>   <span className='fs-6 fw-bold bg-orange p-1 pe-3 rounded-lg mr-2'> First Name  </span>{userInfo.firstName} <br /><br/></Card.Title>
  <Card.Title>   <span className='fs-6 fw-bold bg-orange p-1 pe-3 rounded-lg mr-2'> Last Name </span>{userInfo.lastName} <br /><br/></Card.Title>

 <Card.Text>
 <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'> role </span>
  {userInfo.role}
  </Card.Text>

<hr/>
<Card.Text>
 <span className='fs-6 fw-bold bg-orange  p-1 pe-3 rounded-lg mr-2'>email </span>
  {userInfo.email}
  </Card.Text>




              <hr />
            
          
                    <button
                      className='btn btn-fill btn-secondary me-2'
                      onClick={() => editProfile()}
                    >
                      Edit My Profile
                    </button>
               


<br />
</Card.Body>
<Card.Footer>

  <small className="text-muted">verfied at :   {moment(userInfo.verifiedAt).format('DD-MM-YYYY')}</small>
</Card.Footer>
</Card>
</Container>
  )
}

export default Profile