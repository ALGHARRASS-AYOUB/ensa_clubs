import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ActualityCard(props) {
  const image=`${props.image}`
  //const image=`http://localhost:80/${props.image}`
  return (
    <Card className="text-center">
      <Card.Header>{props.title}</Card.Header>
      <Card.Img variant="top" style={{ maxHeight:'25rem'}} src={image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.body}
        </Card.Text>
        <Button variant="primary">read more ...</Button>
      </Card.Body>
      <Card.Footer className="text-muted">posted at : {props.startAt}</Card.Footer>
    </Card>
  );
}

export default ActualityCard;