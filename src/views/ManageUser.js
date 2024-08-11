import { Link, useNavigate } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import useFiltersHandler from "../hook/useFiltersHandler";
import Pagination from "../components/layout/Pagination"
function ManageUser() {
    const { filters, handleChangePage } = useFiltersHandler({ page: 1, page_size: 10 });
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const getUsers = async () => {
        try {
            const userData = await axios.get('http://localhost:3000/user/list',{
                params: {
                    page: filters.page,
                    size: filters.page_size
                }
            })
            setUser(userData.data.users)
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
    useEffect(() => {
        getUsers()
    },[filters])

    return (  
        <>
            <NavbarMenu />
            <div className="UserManagerContainer" style={{ marginTop: 50 }}>
                <div className="UserManager" style={{ fontSize: 40 }}>Quản lý người dùng</div>
            </div>
            <div style={{ width: '100%',height: 'auto',display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <div style={{ width: '80%'}} >
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
            </div>
            </div>
            <Pagination totalPage={10} currentPage={1} handleChangePage={handleChangePage} admin={true} />
        </>
    );
}

export default ManageUser;