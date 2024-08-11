import useFiltersHandler from "../../hook/useFiltersHandler";
import Pagination from "../../components/layout/Pagination"
import Card from '../../components/card/Card'
import React,{useEffect, useState} from 'react'
import axios from "axios";
import { Box } from '@mui/material';
const MoviePagination = () => {
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
    } catch (error) {
        console.log('error get post');
    }
}
useEffect(() => {
    getPosts()
},[filters])
  return (
    <Box sx={{ paddingLeft: 12,paddingRight:12,paddingTop:8, width: '100%' , height: 'auto' }}>
      <Box sx={{ display: 'flex',flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
            {data.map((movie, index) => (
                <Card name ={movie.name} img={movie.image} price ={movie.price} id = {movie._id} index={index}/>
            ))}
      </Box>
      <Pagination totalPage={10} currentPage={1} handleChangePage={handleChangePage} admin={false} />
      </Box>
  );
};

export default MoviePagination;
