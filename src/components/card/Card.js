import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function MovieCard({name, img, price, id}) {
  
  const [user, setUser] = useState({
    username: '',
    price: ''
  });
  const [idUser, setIdUser] = useState('')
  const navigate = useNavigate()

  const handleWatching = async () => {
    try {        
        if(user.price >= 0 && user.price >= price){          
          const priceUpdate = user.price - price
          setUser({
            ...user,
            price: priceUpdate
          })
          console.log('pra', user.price);
          
          await axios.put(`http://localhost:3000/user/${idUser}`,{price: priceUpdate})
          navigate(`/movies/detail/${id}`)
      }
    } catch (error) {
      console.log('error handle watching');
      
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if(token){
      const decodedtoken = jwtDecode(token)
      setUser({
        ...user,
        username: decodedtoken.username,
        price: decodedtoken.price,

      })
      console.log('prr', price);
      
      setIdUser(decodedtoken.userId)      
    }
  },[])

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
