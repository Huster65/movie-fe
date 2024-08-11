import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../../contexts/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from "axios";
function NavbarMenu() {
  const [username, setUsername] = useState('');
  const [price, setPrice] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const getUser = async (username) => {
    try {
      const userData = await axios.get(`http://localhost:3000/user/detail/${username}`)
        setPrice(userData.data.price);
    } catch (error) {
        console.log('error get post');
    }
}
  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setIsAdmin(decodedToken.isAdmin);
        getUser(decodedToken.username);
    }
  }, []);
  return (
    <Navbar expand="lg" className="bg-dark1 navbar-dark ">
      <Container >
        <Navbar.Brand href="/dashboard">
            <img src='https://phimmoichillv.net/dev/images/logo.png' className='img-logo'></img>
        </Navbar.Brand>
        <Nav.Link href="movies" className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Mới</Nav.Link>
        <Nav.Link href={`/movieType?type=${encodeURIComponent("Phim lẻ")}`} className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Lẻ</Nav.Link>
        <Nav.Link href={`/movieType?type=${encodeURIComponent("Phim bộ")}`} className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Bộ</Nav.Link>
        <NavDropdown title="Thể Loại" id="the-loai-dropdown" className="nav-com nav-dropdown">
          <div>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Hành động")}`}>Phim Hành Động</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Tình cảm")}`}>Phim Tình Cảm</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Hài hước")}`}>Phim Hài Hước</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Cổ trang")}`}>Phim Cổ Trang</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Tâm lý")}`}>Phim Tâm Lý</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Hình sự")}`}>Phim Hình Sự</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Thể thao")}`}>Phim Thể Thao</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Sắp chiếu")}`}>Phim Sắp Chiếu</NavDropdown.Item>
          </div>
          <div>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Võ thuật")}`}>Phim Võ Thuật</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Hoạt hình")}`}>Phim Hoạt Hình</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Viễn tưởng")}`}>Phim Viễn Tưởng</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Phiêu lưu")}`}>Phim Phiêu Lưu</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Khoa học")}`}>Phim Khoa Học</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Ma")}`}>Phim Ma</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Kinh dị")}`}>Phim Kinh Dị</NavDropdown.Item>
            <NavDropdown.Item href={`/category?category=${encodeURIComponent("Thần thoại")}`}>Phim Thần Thoại</NavDropdown.Item>
          </div>
        </NavDropdown>
        <NavDropdown title="Quốc Gia" id="quoc-gia-dropdown" className="nav-com nav-dropdown">
          <div>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Việt Nam")}`}>Việt Nam</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Mỹ")}`}>Mỹ</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Nhật Bản")}`}>Nhật Bản</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Pháp")}`}>Pháp</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Trung Quốc")}`}>Trung Quốc</NavDropdown.Item>
          </div>
          <div>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Hàn Quốc")}`}>Hàn Quốc</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Âu Mỹ")}`}>Âu Mỹ</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Đài Loan")}`}>Đài Loan</NavDropdown.Item>
            <NavDropdown.Item href={`/category?slug=${encodeURIComponent("Hồng Kông")}`}>Hồng Kông</NavDropdown.Item>
          </div>
        </NavDropdown>
        <Nav.Link href={`/movieType?type=${encodeURIComponent("Phim chiếu rap")}`} className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Phim Chiếu Rap</Nav.Link>
        <Nav.Link href={`/movieType?type=${encodeURIComponent("Phim top")}`} className='nav-com nav-link' style={{color: '#f0f8ffc7'}} >Top Phim</Nav.Link>
        {username != '' ? 
        <div>
        <Navbar.Collapse id="basic-navbar-nav " >
          <Nav className="me-auto" >
            <Nav.Link href="#link">{price}đ</Nav.Link>
            <NavDropdown title={username} id="basic-nav-dropdown" style={{ marginRight: 50 }}>
              <NavDropdown.Item href="#action/3.1">
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
              <NavDropdown.Item href="/" onClick={() =>localStorage.clear('userToken')}>
                Đăng Xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </div>
        :
        <>
        <div style = {{  marginRight: 30}}>
              <a href="/login" style={{ color: 'white', fontWeight: 700, fontSize: 20, textDecoration: 'none' }}> 
                LOGIN
              </a>
        </div>
        </>
        }
        
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;