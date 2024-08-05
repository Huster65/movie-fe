import { Link, useNavigate } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function ManageUser() {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user/list')
            setUser(response.data)
        } catch (error) {
            console.log('error get user');
        }
    }

    const handleEdit = async (id) => {
        try {
            navigate(`/user/edit/${id}`)
        } catch (error) {
            console.log('error edit user');
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.get(`http://localhost:3000/user/delete/${id}`)
            navigate('/dashboard')
        } catch (error) {
            console.log('error delete user');
        }
    }


    return (  
        <>
            <NavbarMenu />
            <div className="UserManagerContainer">
                <div className="UserManager">Quản lý người dùng</div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((post, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>  
                            <td>{post.username}</td>  
                            <td>{post.password}</td>  
                            <td>{post.price}</td>  
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

export default ManageUser;