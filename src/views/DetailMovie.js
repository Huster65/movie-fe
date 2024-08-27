import { useParams } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Button from 'react-bootstrap/Button';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function DetailMovie() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        price: ''
      });
    const [idUser, setIdUser] = useState('')
    const [movieData, setMovieData] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        videoId: '',
        slug: '',
        status: 'HD Vietsub',
        releaseYear: 2024,
        country: 'Phim Âu Mỹ',
        genre: 'Phim Hành Động, Phim Hài Hước, Phim Chiếu Rạp',
        director: 'Adil El Arbi, Bilall Fallah',
        imdbRating: 7.0,
        rottenTomatoes: '65% Tomatometer',
        duration: '1 giờ 55 phút',
        actors: 'Will Smith, Martin Lawrence, Vanessa Hudgens, Alexander Ludwig'
    });
    const [rating, setRating] = useState([])
    const getMovie = async () => {
        try {
            const movie = await axios.get(`http://localhost:3000/movies/${id}`)
            setMovieData(movie.data)
        } catch (error) {
            console.log('error get movie');
        }
    }
    const getRatingMovie = async () => {
        try {
            const ratingResponse = await axios.get(`http://localhost:3000/ratings/movie/${id}`)
            setRating(ratingResponse.data)
            console.log('error get movie',ratingResponse);
        } catch (error) {
            console.log('error get movie');
        }
    }
    const handleWatching = async () => {
        try {        
            if(user.price >= 0 && user.price >= movieData.price){          
              const priceUpdate = user.price - movieData.price
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
        getRatingMovie()
        getMovie()
    }, [])
    return (
        <>
            <NavbarMenu />
            <div className="dashboard" style={{ width: '100%', height: 550,display: 'flex', justifyContent: 'center'}}>
                <div style={{ width: '80%', height: 500,
                     display: 'flex',
                     marginTop: 60,justifyContent: 'space-between'
                     }}>
                    <div style={{ width: '35%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={movieData.image} style={{ width: '80%', height: 350 , objectFit: 'cover' }} ></img>
                        <Button className='btn-card' style={{ marginTop: 20 }} onClick={() => {handleWatching()}} >Xem Ngay</Button>
                    </div>
                    <div style={{ width: '60%', height: 300, backgroundColor: 'black',display: 'flex', justifyContent: 'center', borderRadius: 30, alignItems: 'center' }}>
                    <div style={{ width: '560px', fontSize: '14px', textAlign: 'left', color: '#fff' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div style={{ flex: '0 0 50%', padding: '10px',lineHeight: 1.8, fontSize: 16 }}>
                                <p><strong>Đang phát:</strong> <span style={{ color: 'red' }}>HD Vietsub</span></p>
                                <p><strong>Năm Phát Hành:</strong> 2024</p>
                                <p><strong>Quốc gia:</strong> {movieData.slug} </p>
                                <p><strong>Thể loại:</strong> {movieData.category} </p>
                            </div>
                            <div style={{ flex: '0 0 50%', padding: '10px',lineHeight: 1.8, fontSize: 16 }}>
                                <p><strong>Đạo diễn:</strong> Adil El Arbi, Bilall Fallah</p>
                                <p><strong>Điểm Rottentomatoes:</strong> Tomatometer</p>
                                <p><strong>Thời lượng:</strong> 1 giờ 55 phút</p>
                                <p><strong>Diễn viên:</strong> {movieData.actors}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="dashboard" style={{ width: '100%', height:'auto', display: 'flex', justifyContent: 'center',}}>
                    <div style={{ width: '80%', height: 'auto',display: 'flex', flexDirection: 'column'}}> 
                     <p style={{fontSize: 36, color: 'white', fontWeight: 800  }}>Bình luận</p>
                     <div style={{ width: '90%', height: 500, display: 'flex', flexDirection: 'column', paddingLeft : 100, paddingTop: 30}}>
                        {rating.map((data,index) =>(
                                <div style={{width: '80%', height: 60, marginBottom: 30, display: 'flex', alignItems: 'center'}}>
                                    <img src='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' style={{ width: 50,height:50, borderRadius: 25 }}></img>
                                    <div style={{display: 'flex', width: '100%', height: '100%', marginLeft: 40, flexDirection: 'column'}}>
                                        <div style ={{ display: 'flex',flexDirection: 'row', alignItems: 'center' }}>
                                            <div style={{ fontSize: 20, color: 'white', fontWeight: '600', marginRight: 20 }}>{data.name}</div>
                                            {Array.from({ length: data.star }).map((_, i) => (
                                                <StarIcon key={i} sx={{ color: 'yellow' }} />
                                            ))}
                                        </div>
                                        <div style={{ fontSize: 16, color: 'white', fontWeight: '400' }}>{data.content}</div>
                                    </div>
                                </div>
                        ))}
                     </div>
                    </div>
            </div>
            <Footer />
            
        </>
    );
}

export default DetailMovie;
