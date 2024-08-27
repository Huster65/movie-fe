import { useParams } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Button from 'react-bootstrap/Button';
import ReviewPopup from '../components/Rating'
import {jwtDecode} from 'jwt-decode';
function Detail() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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

    const getMovie = async () => {
        try {
            const movie = await axios.get(`http://localhost:3000/movies/${id}`)
            setMovieData(movie.data)
        } catch (error) {
            console.log('error get movie');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken');
    if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
    }
        getMovie()
    }, [])
    return (
        <>
            <NavbarMenu />
            <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginTop: '-40px', backgroundColor: '#121212' }}>
                <div style={{marginTop: '80px'}}>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movieData.videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <Button className='btn-card' style={{ marginRight: 50, marginTop: 20 }} onClick={handleOpen}>Bình luận</Button>
                <div style={{ width: '560px', fontSize: '14px', textAlign: 'left', color: '#fff', marginTop: 30 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 50%', padding: '10px' }}>
                            <p><strong>Đang phát:</strong> <span style={{ color: 'red' }}>HD Vietsub</span></p>
                            <p><strong>Năm Phát Hành:</strong> 2024</p>
                            <p><strong>Quốc gia:</strong> Trung Quốc </p>
                            <p><strong>Thể loại:</strong> Phim hoạt hình hài hước</p>
                        </div>
                        <div style={{ flex: '0 0 50%', padding: '10px' }}>
                            <p><strong>Đạo diễn:</strong> Adil El Arbi, Bilall Fallah</p>
                            <p><strong>Điểm Rottentomatoes:</strong> Tomatometer</p>
                            <p><strong>Thời lượng:</strong> 1 giờ 55 phút</p>
                            <p><strong>Diễn viên:</strong> {movieData.actors}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewPopup open={open} handleClose={handleClose} name={username} movieId={id} />
            <Footer />
             
        </>
    );
}

export default Detail;
