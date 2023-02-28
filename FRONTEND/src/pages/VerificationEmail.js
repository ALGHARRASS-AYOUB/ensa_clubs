import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerificationEmail = () => {

  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)
  const [loading,setLoading]=useState(false)
const {status}=useParams();
console.log('stauts',status,status=="false")
  
  const verify=async()=>{
    const VERIFICATION_URL=    'http://localhost:80/api/v1/verification';
    const TOKEN=userInfo.token;
    try {
        setLoading(true)
   
        var config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        const res=await axios.post(VERIFICATION_URL,null,config);
        if(res?.data.data.status=='verification-link-sent')
        toast.success('link has been sent check your email')
        setLoading(false)
        return res;
    } catch (error) {
        toast.error('an error has been occured  ')
    }
}


useEffect(()=>{
    verify()
},[])

  return (
    <Container className='m-5'>
        
         <Card  style={{ width: '20rem' }}>
      <Card.Header > 
           <Card.Img variant="top" className='' style={{ 'maxWidth':'50rem','maxHeight':'40rem' }} src="https://img.freepik.com/premium-vector/flat-modern-character-received-confirmation-with-check-mark-letter-acceptance-approval_372769-1981.jpg?w=740" />
</Card.Header>
      <Card.Body>
        {
            status=='true'?   
               <Card.Title>Email Verified <i className='fa fa-check-circle'></i></Card.Title>
            :<Card.Title>Email verification<small className='mx-2'>not verified yet</small> <i className='fa fa-check-times-circle'></i></Card.Title>
        }
        <Card.Text>
          email verification 
        </Card.Text>
        {
             status=='true'?<a className='btn btn-info' href='/club-register'>create your club now</a>:<h2 className='p-2 bg-blue rounded-lg'>Check your mail</h2>
        }
      </Card.Body>
    </Card>

    </Container>
  )
}

export default VerificationEmail