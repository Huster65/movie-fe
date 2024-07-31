import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../contexts/AuthContext';
import {jwtDecode} from 'jwt-decode';

function BasicExample() {
  const [username, setUsername] = useState('');
  const [price, setPrice] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setPrice(decodedToken.price);
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
  }, []);
  return (
    <Navbar expand="lg" className="bg-dark1 navbar-dark ">
      <Container >
        <Navbar.Brand href="/dashboard">
            <img src='https://phimmoichillv.net/dev/images/logo.png' className='img-logo'></img>
        </Navbar.Brand>
        <div className='nav-com'>Phim Mới</div>
        <div className='nav-com'>Phim Lẻ</div>
        <div className='nav-com'>Phim Bộ</div>
        <div className='nav-com'>Thể Loại</div>
        <div className='nav-com'>Quốc Gia</div>
        <div className='nav-com'>Phim Chiếu Rạp</div>
        <div className='nav-com'>Top Phim</div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className='ml-120'>
          <Nav className="me-auto">
            <Nav.Link href="#link">{price}đ</Nav.Link>
            <NavDropdown title={username} id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1" >
                Thông tin cá nhân
              </NavDropdown.Item>
              {isAdmin && (
                <NavDropdown.Item href="/movies/list">
                Danh sách phim
              </NavDropdown.Item>
              )}
              {isAdmin && (
                <NavDropdown.Item href="/user/manage">
                Quản lý người dùng
              </NavDropdown.Item>
              )}
              <NavDropdown.Item href="/">
                Đăng Xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;