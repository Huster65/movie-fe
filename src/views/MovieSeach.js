import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import Footer from "../components/layout/Footer";
import { useLocation } from 'react-router-dom';
import useFiltersHandler from "../hook/useFiltersHandler";
import Pagination from "../components/layout/Pagination"
import Card from '../components/card/Card'
import React,{useEffect, useState} from 'react'
import { Box } from '@mui/material';
function MovieSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const [data, setData] = useState([])
    const { filters, handleChangePage } = useFiltersHandler({ page: 1, page_size: 16 });
  const getPosts = async () => {
    try {
        const posts = await axios.get('http://localhost:3000/movies/posts', {
            params: {
                page: filters.page,
                size: filters.page_size,
                search: searchQuery
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
                        {searchQuery === null ? "PHIM MỚI" : "KẾT QUẢ"}
                    </Box>
                </Box>
                <Box sx={{ paddingLeft: 12,paddingRight:12,paddingTop:8, width: '100%' , height: 'auto' }}>
                <Box sx={{ display: 'flex',flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
                        {data.map((movie, index) => (
                            <Card name ={movie.name} img={movie.image} price ={movie.price} id = {movie._id} index={index}/>
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

export default MovieSearch;