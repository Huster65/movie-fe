import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router-dom";
import useFiltersHandler from "../hook/useFiltersHandler";
import Pagination from "../components/layout/Pagination"
import Card from '../components/card/Card'
import { useLocation } from 'react-router-dom';
import React,{useEffect, useState} from 'react'
import { Box } from '@mui/material';
function MovieCategory() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const slug = queryParams.get('slug')
    const [data, setData] = useState([])
    const { filters, handleChangePage } = useFiltersHandler({ page: 1, page_size: 16 });
  const getPosts = async () => {
    try {
        const posts = await axios.get('http://localhost:3000/movies/posts', {
            params: {
                page: filters.page,
                size: filters.page_size,
            }
        })
        setData(posts.data.posts)
        console.log('data', data);
    } catch (error) {
        console.log('error get post');
    }
}
useEffect(() => {
    getPosts()
},[filters])
    return (  
        <>
        <NavbarMenu />
        <div className="dashboard">
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 12,paddingRight:12,paddingTop:8, width: '100%'}}>
                    <Box sx={{ fontSize: 30, color: 'white',fontWeight: '900', marginRight: 2}}>
                        {category === "Hành động" && "PHIM HÀNH ĐỘNG"}
                        {category === "Tình cảm" && "PHIM TÌNH CẢM"}
                        {category === "Hài hước" && "PHIM HÀI HƯỚC"}
                        {category === "Cổ trang" && "PHIM CỔ TRANG"}
                        {category === "Tâm lý" && "PHIM TÂM LÝ"}
                        {category === "Hình sự" && "PHIM HÌNH SỰ"}
                        {category === "Thể thao" && "PHIM THỂ THAO"}
                        {category === "Võ thuật" && "PHIM VÕ THUẬT"}
                        {category === "Hoạt hình" && "PHIM HOẠT HÌNH"}
                        {category === "Viễn tưởng" && "PHIM VIỄN TƯỞNG"}
                        {category === "Phiêu lưu" && "PHIM PHIÊU LƯU"}
                        {category === "Khoa học" && "PHIM KHOA HỌC"}
                        {category === "Ma" && "PHIM MA"}
                        {category === "Kinh dị" && "PHIM KINH DỊ"}
                        {category === "Thần thoại" && "PHIM THẦN THOẠI"}
                        {slug === "Việt Nam" && "PHIM VIỆT NAM"}
                        {slug === "Mỹ" && "PHIM MỸ"}
                        {slug === "Nhật Bản" && "PHIM NHẬT BẢN"}
                        {slug === "Pháp" && "PHIM PHÁP"}
                        {slug === "Trung Quốc" && "PHIM TRUNG QUỐC"}
                        {slug === "Hàn Quốc" && "PHIM HÀN QUỐC"}
                        {slug === "Âu Mỹ" && "PHIM ÂU MỸ"}
                        {slug === "Đài Loan" && "PHIM ĐÀI LOAN"}
                        {slug === "Hồng Kông" && "PHIM HỒNG KÔNG"}
                    </Box>
                </Box>
                <Box sx={{ paddingLeft: 12,paddingRight:12,paddingTop:8, width: '100%' , height: 'auto' }}>
                <Box sx={{ display: 'flex',flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
                {data
                    .filter(post => post.category === category || post.slug === slug )
                    .map((post, index) => (
                    <Card key={index} name={post.name} img={post.image} price={post.price} id={post._id} />
                ))}
                </Box>
                <Pagination totalPage={10} currentPage={1} handleChangePage={handleChangePage} admin={false} />
                </Box>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default MovieCategory;