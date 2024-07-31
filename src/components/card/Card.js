import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function MovieCard({name, img, price, id}) {

  const navigate = useNavigate()

  const handleWatching = () => {
    navigate(`/movies/detail/${id}`)
  }

  return (
    <Card style={{ width: '13rem' }} className='movieCard'>
      <Card.Img variant="top" src={img}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="button-container">
            <Button className='btn-card' onClick={() => {handleWatching()}}>Xem Ngay</Button>
            <p>{price}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
