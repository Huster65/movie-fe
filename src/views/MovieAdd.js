import { Form, Button } from 'react-bootstrap';
import NavbarMenu from "../components/layout/NavbarMenu";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

function AddMovie() {
    const navigate = useNavigate();  

    const [movieData, setMovieData] = useState({
        name: '',
        image: '',
        price: '',
        videoId: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/movies/store', movieData);
            console.log('Phim đã được thêm:', response.data);
            navigate('/movies/list'); // Chuyển hướng về trang /movies/list
        } catch (error) {
            console.error('Lỗi khi thêm phim:', error);
        }
    };

    return (
        <div>
            <NavbarMenu />
            <div className='add-movie-text'>Thêm Phim</div>
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
                    <Form.Label>Video Id</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập videoId" 
                        name="videoId" 
                        value={movieData.videoId} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập Type" 
                        name="type" 
                        value={movieData.type} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Thêm Phim
                </Button>
            </Form>
        </div>
    );
}

export default AddMovie;
