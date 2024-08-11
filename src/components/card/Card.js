import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Box, Tooltip } from '@mui/material';

function MovieCard({name, img, price, id, index}) {
  
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
      
      setIdUser(decodedtoken.userId)      
    }
  },[])

  return (
    // <Card style={{ width: '13rem' }} className='movieCard'>
    //   <Card.Img variant="top" src={img}/>
    //   <Card.Body>
    //     <Card.Title>{name}</Card.Title>
    //     <div className="button-container">
    //         <Button className='btn-card' onClick={() => {handleWatching()}}>Xem Ngay</Button>
    //         <p>{price}</p>
    //     </div>
    //   </Card.Body>
    // </Card>
    <Box key={index} sx={{ padding: 1, display: 'flex', marginRight: 2, marginBottom: 4 }}>
    <Card sx={{ height: 350, width: 280 }}>
      <CardMedia
        component="img"
        image={img}
        alt={name}
        sx={{ height: 200 }}
      />
      <CardContent sx={{display: 'flex',flexDirection:'column', justifyContent: 'space-between', backgroundColor: '#121212', color: 'white', height: 150 ,padding: 2 }}>
        <Tooltip title={name} placement="top">
          <div className='text-over-flow-movie'>
            {name}
          </div>
        </Tooltip>
        <div className="button-container">
            <Button className='btn-card' style={{ marginRight: 50 }} onClick={() => {handleWatching()}}>Xem Ngay</Button>
             <p>{price}</p>
         </div>
      </CardContent>
    </Card>
  </Box>
  );
}

export default MovieCard;
