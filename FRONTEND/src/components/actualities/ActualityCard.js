import moment, { now } from 'moment';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useActuality } from '../../context/ActualityContext';

function ActualityCard({actuality}) {
  const [userInfo,setUserInfo] = useState(localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')).data:null)

  const {deleteActuality} =useActuality('')
  const navigate=useNavigate()

const _detailsActuality=(id)=>{
  return navigate('/admin/actualities/DetailsActuality', {
    state: {
      id: id,
    },
  });
}

const _editActuality=(id)=>{
  return navigate('/admin/actualities/EditActuality', {
    state: {
      id: id,
    },
  });
}



async function _deleteActuality(id) {
  const data = await deleteActuality(id);
  if (data != null) {
    toast.success('event Deleted');
  }

}





  const image=`${actuality.evenement!=null ? actuality.evenement.image:actuality.image}`
  //const image=`http://localhost:80/${props.image}`
  return (
    <Card className="text-center">
      <Card.Header>{actuality.evenement==null ? actuality.title:actuality.evenement.name}</Card.Header>
      <Card.Img variant="top" style={{ maxHeight:'25rem'}} src={image} />
      <Card.Body>
        <Card.Title>{actuality.evenement==null ? actuality.title:actuality.evenement.name}</Card.Title>
        <Card.Text style={{ maxHeight:'4  rem',overflow:'ellipsis',textOverflow:'ellipsis' }}>
        {actuality.evenement==null ? actuality.body:actuality.evenement.description}
        </Card.Text>
        <Row>
          <span className='fw-bold  m-1 bg-orange rounded-lg'> actions </span>
          <Col>
            <Button variant="info" size='sm' title='details of actuality' className='m-1' onClick={()=>_detailsActuality(actuality.id)}><i className='fa fa-info-circle'></i></Button>
            {
              userInfo.role =='admin' && 
              <>
                 <Button variant="success" size='sm' title='edit this actuality' className='m-1' onClick={()=>_editActuality(actuality.id)}><i className='fa fa-wrench'></i></Button>
                 <Button variant="danger" size='sm' title='delete this actuality' className='m-1' onClick={()=>_deleteActuality(actuality.id)}><i className='fa fa-trash'></i></Button>
             </>
            }
          </Col>
          <div className='border border-bottom-2 border-warning'></div>
        </Row>
      </Card.Body>
      {actuality.evenement &&
              <Card.Title className='my-2'> <span className='square bg-secondary rounded-pill p-2 m-2'>event date</span> {moment(actuality.evenement.dateEvent).format('dddd, MMMM Do YYYY')}</Card.Title>
      }
      <Card.Footer className="m-1 text-muted">posted at : {actuality.startAt}</Card.Footer>
    </Card>
  );
}

export default ActualityCard;