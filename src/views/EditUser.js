import { Form, Button } from 'react-bootstrap';
import NavbarMenu from "../components/layout/NavbarMenu";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditUser() {
    const navigate = useNavigate();  
    const { id } = useParams();

    const [user, setUser] = useState({
        username: '',
        password: '',
        price: '',
        isAdmin: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/user/${id}`, user)
        } catch (error) {
            console.log('error submit')
        }
    }

    const getUser = async () => {
        try {
            const userr = await axios.get(`http://localhost:3000/user/getuser/${id}`)
            setUser(userr.data)
        } catch (error) {
            console.log('error get user');
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (  
        <>
            <div>
            <NavbarMenu />
            <div className='add-movie-text'>Cập nhật User</div>
            <Form onSubmit={handleSubmit} className='ml-10'>
                {/* Trường Tên Phim */}
                <Form.Group className="mb-3" controlId="formMovieName">
                    <Form.Label>Tên User</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Tên user" 
                        name="username" 
                        value={user.username} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMovieName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMovieName">
                    <Form.Label>Số tiền trong ví</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Price" 
                        name="price" 
                        value={user.price} 
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

export default EditUser;