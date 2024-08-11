import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import MovieCard from "../components/card/Card";
import Footer from "../components/layout/Footer";
import useFiltersHandler from "../hook/useFiltersHandler";
import Pagination from "../components/layout/Pagination"
import { useLocation } from 'react-router-dom';
import Card from '../components/card/Card'
import React,{useEffect, useState} from 'react'
import { Box } from '@mui/material';
function MovieType() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const { filters, handleChangePage } = useFiltersHandler({ page: 1, page_size: 16 });
  const [data,setData] = useState([])

  const getPosts = async () => {
    try {
        const posts = await axios.get('http://localhost:3000/movies/posts', {
            params: {
                page: filters.page,
                size: filters.page_size
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
                        {type === "Phim lẻ" && "PHIM LẺ"}
                        {type === "Phim bộ" && "PHIM BỘ"}
                        {type === "Phim chiếu rap" && "PHIM CHIẾU RẠP"}
                        {type === "Phim top" && "TOP PHIM"}
                    </Box>
                </Box>
                <Box sx={{ paddingLeft: 12,paddingRight:12,paddingTop:4, width: '100%' ,marginBottom: 5, height: 'auto' }}>
                    <Box sx={{ display: 'flex',flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
                            {data
                                .filter(post => post.type === type)
                                .map((post, index) => (
                                <Card name ={post.name} img={post.image} price ={post.price} id = {post._id} index={index} />
                            ))}
                    </Box>
                    <Pagination totalPage={10} currentPage={1} handleChangePage={handleChangePage} admin={false}/>
                </Box>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default MovieType;