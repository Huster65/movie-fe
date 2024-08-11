// src/MovieCarousel.tsx
import React,{useEffect, useState} from 'react'
import axios from "axios";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box } from '@mui/material';
import MovieCard from '../../components/card/CardCarousel'
const movies = [
  {
    title: 'Gia Đình Điệp Viên Mã: Trắng – Spy x Family Code: White',
    year: 2023,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Tâm lý',
  },
  {
    title: 'Cuốc xe đêm – Daddio',
    year: 2023,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Tâm lý',
  },
  {
    title: 'Xiềng Xích – Lock Up',
    year: 1989,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Tâm lý',
  },
  {
    title: 'Đặc Vụ Sống Còn – MR-9: Do or Die',
    year: 2023,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Tâm lý',
  },
  {
    title: 'Thanh Xuân 18×2: Lữ Trình Hướng Về Em – 18×2 Beyond Youthful Days',
    year: 2024,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Tâm lý',
  },
  {
    title: 'Địch Nhân Kiệt: Kháng Long Hữu Hối – Detective Dee and The Arrogant Ruler',
    year: 2024,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Hình sự, Kỳ ảo, Historical',
  },
  {
    title: 'Địch Nhân Kiệt: Kháng Long Hữu Hối – Detective Dee and The Arrogant Ruler',
    year: 2024,
    image: 'https://file.hstatic.net/1000159991/file/doremon-min_d7fba7f7f60a41a0af6e67dcaeb75634_grande.jpg',
    genre: 'Hình sự, Kỳ ảo, Historical',
  },
  
];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieCarousel = () => {
  const [data,setData] = useState([])
  const getPosts = async () => {
    try {
        const posts = await axios.get('http://localhost:3000/movies/posts', {
            params: {
                page: 1,
                size: 8
            }
        })
        setData(posts.data.posts)
    } catch (error) {
        console.log('error get post');
    }
  }
  useEffect(() => {
    getPosts()
},[])
  return (
    <Box sx={{ paddingLeft: 12,paddingRight:12,paddingTop:8, width: '100%' , height: 500 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row',}}>
        <Box sx={{ fontSize: 30, color: 'red',fontWeight: '900', marginRight: 2,marginBottom: 1}}>PHIM HOT</Box>
        <Box sx={{ fontSize: 30, color: 'white',fontWeight: '900'}}>ĐANG XEM</Box>
      </Box>
      <Carousel additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={5000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 5,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={4}
          swipeable
  >
        {data.map((movie, index) => (
          <MovieCard movie ={movie} index={index}/>
        ))}
      </Carousel>
    </Box>
  );
};

export default MovieCarousel;
