import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../contexts/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';

function NavbarMenu() {
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
        <Nav.Link href="/movies/newmovies" className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Mới</Nav.Link>
        <Nav.Link href="/movies/oddmovies" className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Lẻ</Nav.Link>
        <Nav.Link href="/movies/seriesmovies" className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Bộ</Nav.Link>
        <NavDropdown title="Thể Loại" id="the-loai-dropdown" className="nav-com nav-dropdown">
          <div>
            <NavDropdown.Item href="#vietnam">Phim Hành Động</NavDropdown.Item>
            <NavDropdown.Item href="#my">Phim Tình Cảm</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Phim Hài Hước</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Cổ Trang</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Tâm Lý</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Hình Sự</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Thể Thao</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Sắp Chiếu</NavDropdown.Item>
          </div>
          <div>
            <NavDropdown.Item href="#vietnam">Phim Võ Thuật</NavDropdown.Item>
            <NavDropdown.Item href="#my">Phim Hoạt Hình</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Phim Viễn Tưởng</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Phiêu Lưu</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Khoa Học</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Ma</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Kinh Dị</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Phim Thần Thoại</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown title="Quốc Gia" id="quoc-gia-dropdown" className="nav-com nav-dropdown">
          <div>
            <NavDropdown.Item href="#vietnam">Việt Nam</NavDropdown.Item>
            <NavDropdown.Item href="#my">Mỹ</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Nhật Bản</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Pháp</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Trung Quốc</NavDropdown.Item>
          </div>
          <div>
            <NavDropdown.Item href="#vietnam">Hàn Quốc</NavDropdown.Item>
            <NavDropdown.Item href="#my">Âu Mỹ</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Đài Loan</NavDropdown.Item>
            <NavDropdown.Item href="#phap">Hồng Kông</NavDropdown.Item>
          </div>
        </NavDropdown>
        <div className='nav-com'>Phim Chiếu Rạp</div>
        <NavDropdown title="Top Phim" id="top-phim-dropdown" className="nav-com nav-dropdown">
          <div>
            <NavDropdown.Item href="#vietnam">Top IMDB</NavDropdown.Item>
            <NavDropdown.Item href="#my">Phim Netflix</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Phim Marvel</NavDropdown.Item>
          </div>
          <div>
            <NavDropdown.Item href="#vietnam">Phim Hot</NavDropdown.Item>
            <NavDropdown.Item href="#my">Phim HD</NavDropdown.Item>
            <NavDropdown.Item href="#nhatban">Phim DC Comic</NavDropdown.Item>
          </div>
        </NavDropdown>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className='ml-120'>
          <Nav className="me-auto">
            <Nav.Link href="#link">{price}đ</Nav.Link>
            <NavDropdown title={username} id="basic-nav-dropdown">
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
              <NavDropdown.Item href="/user/bank">
                Nạp Tiền
              </NavDropdown.Item>
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

export default NavbarMenu;