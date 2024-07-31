import Table from 'react-bootstrap/Table';
import NavbarMenu from "../components/layout/NavbarMenu";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Nhập Link từ react-router-dom

function MoviesLists() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        getPosts(); 
    }, []);

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/movies/posts');
            setData(response.data.posts);
        } catch (error) {
            console.log('error get post', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.get(`http://localhost:3000/movies/delete/${id}`)
            navigate('/dashboard')
        } catch (error) {
            console.log('error delete post');
        }
    }

    const handleEdit = async (id) => {
        try {
            navigate(`/movies/edit/${id}`)
        } catch (error) {
            console.log('error edit post');
        }
    }

    return (
        <>
            <NavbarMenu />
            <div className="d-flex justify-content-end mb-3"> {/* Sử dụng d-flex và justify-content-end để căn chỉnh nút */}
                <Link to="/movies/add" className="btn btn-primary add-btn-movie">Thêm Phim</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
                            <td>{post.name}</td> {/* Giả sử bạn có thuộc tính name trong mỗi object */}
                            <td>{post.price}</td> {/* Giả sử bạn có thuộc tính price trong mỗi object */}
                            <td>
                                <button className="btn btn-primary action-btn" onClick={() => handleEdit(post._id)}>Edit</button>
                                <button className="btn btn-danger action-btn" onClick={() => handleDelete(post._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default MoviesLists;
