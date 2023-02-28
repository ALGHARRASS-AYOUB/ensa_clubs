import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Toast } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verified = () => {
    console.log('in verifiisfisd')

  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
const navigate=useNavigate()
const [verified,setVerified]=useState()
const {id}=useParams()
const {hash}=useParams()


  
async  function  handleVerify(){
    const VERIFICATION_URL=   `http://localhost/api/v1/verify-email/${id}/${hash}`;
    const TOKEN=userInfo.token;
    try {

        var config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        const res=await axios.get(VERIFICATION_URL,config);
            if(res!=null){
                console.log('res ',res)
                setVerified(true)
                console.log('verified??',verified)
                toast.success('email verified')
                navigate('/email-verification/true')  
            }
        return res;
    } catch (error) {
        toast.error('an error has been occured  ')
    }
}


useEffect(()=>{
    
},[])

  return (
    <Container className='m-5'>

         <Card  style={{ width: '20rem' }}>
      <Card.Header > 
           <Card.Img variant="top" className='' style={{ 'maxWidth':'50rem','maxHeight':'40rem' }} src="https://img.freepik.com/premium-vector/flat-modern-character-received-confirmation-with-check-mark-letter-acceptance-approval_372769-1981.jpg?w=740" />
</Card.Header>
      <Card.Body>
      <Card.Title>Email verification {verified?<i className='fa fa-check-circle'></i>:<i className='fa fa-check-times-circle'>not verified yet</i>}</Card.Title>
        {/* <Card.Title>Email Verified <i className='fa fa-check-circle'></i></Card.Title> */}
        <Card.Text>
          click on verify to verify your email 
        </Card.Text>
     <Button variant='info' onClick={handleVerify()}>Verify now</Button>
      </Card.Body>
    </Card>

    </Container>
  )
}

export default Verified