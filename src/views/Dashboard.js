import axios from "axios";
import NavbarMenu from "../components/layout/NavbarMenu";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/card/Card";
import Footer from "../components/layout/Footer";
import MovieCarousel from "./compoments/MovieCarousel"
import SearchInput from "./compoments/SearchInput"
import { makeStyles } from '@mui/styles';
import MoviePagination from './compoments/MoviePagination'
const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'initial', // Màu viền khi chưa focus
        },
        '&:hover fieldset': {
          borderColor: 'initial', // Màu viền khi hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'initial', // Màu viền khi focus
        },
      },
    },
  });
function Dashboard() {
    return (  
        <div>
            <NavbarMenu />
            <div className="dashboard">
                <SearchInput />           
                <MovieCarousel />
                <MoviePagination />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Dashboard;