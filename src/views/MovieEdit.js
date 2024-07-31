import { Form, Button } from 'react-bootstrap';
import NavbarMenu from "../components/layout/NavbarMenu";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MovieEdit() {
    const navigate = useNavigate();  
    const { id } = useParams();

    const [movieData, setMovieData] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        videoId: '',
        slug: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/movies/${id}`, movieData)
        } catch (error) {
            console.log('error submit')
        }
    }

    const getMovie = async () => {
        try {
            const movie = await axios.get(`http://localhost:3000/movies/${id}`)
            setMovieData(movie.data)
        } catch (error) {
            console.log('error get movie');
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (  
        <>
            <div>
            <NavbarMenu />
            <div className='add-movie-text'>Chỉnh Sửa Phim</div>
            <Form onSubmit={handleSubmit} className='ml-10'>
                {/* Trường Tên Phim */}
                <Form.Group className="mb-3" controlId="formMovieName">
                    <Form.Label>Tên Phim</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập tên phim" 
                        name="name" 
                        value={movieData.name} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                {/* Trường Đường dẫn Ảnh Phim */}
                <Form.Group className="mb-3" controlId="formMovieSrc">
                    <Form.Label>Đường dẫn Ảnh Phim</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập đường dẫn ảnh" 
                        name="image" 
                        value={movieData.image} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                {/* Trường Giá Phim */}
                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>Giá Phim</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Nhập giá phim" 
                        name="price" 
                        value={movieData.price} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>VideoId</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập videoId" 
                        name="videoId" 
                        value={movieData.videoId} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập description" 
                        name="description" 
                        value={movieData.description} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cập nhật 
                </Button>
            </Form>
        </div>
        </>
    );
}

export default MovieEdit;