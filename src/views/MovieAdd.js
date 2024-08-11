import { Form, Button } from 'react-bootstrap';
import NavbarMenu from "../components/layout/NavbarMenu";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { Box } from '@mui/material';

function AddMovie() {
    const navigate = useNavigate();  

    const [movieData, setMovieData] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        videoId: '',
        type: '',
        category: '',
        slug: ''
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

                <Form.Group className="mb-3" controlId="formMovieName">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập Mô Tả" 
                        name="description" 
                        value={movieData.description} 
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

                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>Thể Loại</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập thể loại phim" 
                        name="category" 
                        value={movieData.category} 
                        onChange={handleChange} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMoviePrice">
                    <Form.Label>Quốc Gia</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập quốc gia" 
                        name="slug" 
                        value={movieData.slug} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Box sx={{ width: '100%', display: 'flex', justifyContent:'center', marginBottom: 10,marginTop: 5 }}>
                <Button variant="primary" type="submit" style={{  }}>
                    Thêm Phim
                </Button>
                </Box>
            </Form>
        </div>
    );
}

export default AddMovie;
