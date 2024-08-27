import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Về Chúng Tôi</h5>
            <p>Trang web xem phim chất lượng cao với nhiều thể loại phim hấp dẫn.</p>
          </Col>
          <Col md={4}>
            <h5>Liên Hệ</h5>
            <ul className="list-unstyled">
              <li>Email: nguyendoan@gmail.com </li>
              <li>Điện thoại: 0984660074 </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Theo Dõi Chúng Tôi</h5>
            <ul className="list-unstyled">
              <li><a href="https://facebook.com" className="text-light">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-light">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-light">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2024 Phim Mới Chill. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
